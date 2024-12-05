"use server";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  LoginResponseSchema,
  TelegramUser,
  TelegramUserSchema,
} from "@/schemas/user-schema";
import { redirect } from "next/navigation";
import apiClient from "@/lib/axios-client";

const jwtSecret = process.env.JWT_SECRET;
const key = new TextEncoder().encode(jwtSecret);
const week = 1000 * 60 * 60 * 24 * 7;

export type SessionType = {
  user: TelegramUser;
} & JWTPayload;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("lumios")
    .setAudience("lumios")
    .setExpirationTime("1week")
    .sign(key);
}

export async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(accountId: number): Promise<string> {
  const expires = new Date(Date.now() + week);
  const userResponse = await apiClient.get(`/auth/user/${accountId}`);
  const userData = LoginResponseSchema.parse(userResponse.data);
  let chatId: number;
  try {
    const chatResponse = await apiClient.get(`/auth/unbind/${accountId}`);
    chatId = parseInt(chatResponse.data);
  } catch {
    if (userData.chats.length === 0) {
      throw new Error("No chats found");
    }
    chatId = userData.chats[0].id;
    await updateChatId(chatId);
  }
  const user = TelegramUserSchema.parse({
    ...userData,
    isAdmin: userData.chats.find((x) => x.id == chatId)?.admin ?? false,
    chatId: chatId,
  });
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });
  return userData.username;
}

export async function updateChatId(chatId: number) {
  const session = await getSession();
  if (!session) return;
  const accountId = session.user.accountId;
  if (!accountId) return;
  await apiClient.post(
    `/auth/bind/${accountId}`,
    {},
    {
      headers: {
        chatId: chatId.toString(),
      },
    },
  );
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
}

export async function getSession(): Promise<SessionType | null> {
  try {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    const sessionValue = await decrypt(session);
    return sessionValue as SessionType;
  } catch (e) {
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = await getSession();
  if (!session) return;
  session.expires = new Date(Date.now() + week);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires as Date,
  });
}

export async function getChats() {
  const session = await getSession();
  if (!session) return [];
  const accountId = session.user.accountId;
  if (!accountId) return [];
  const response = await apiClient.get(`/auth/user/${accountId}`);
  const parsedResponse = LoginResponseSchema.parse(response.data);
  return parsedResponse.chats;
}

export async function getPhoto(id: number | string) {
  const response = await apiClient.get(`/auth/photo/${id}`, {
    responseType: "arraybuffer",
  });
  return response.data;
}
