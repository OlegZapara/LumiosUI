import {
  GET_USER,
  GET_USER_CHAT_ID,
  UPDATE_USER_CHAT_ID,
} from "@/shared/endpoints";
import { NextRequest, NextResponse } from "next/server";

function getApiKey() {
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  return apiKey;
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const apiResponse = await fetch(GET_USER_CHAT_ID(userId!), {
    headers: {
      "content-type": "application/json",
      "X-API-KEY": getApiKey(),
    },
  });
  if (!apiResponse.ok) {
    return new NextResponse(await apiResponse.text(), {
      status: apiResponse.status,
    });
  }
  return NextResponse.json(await apiResponse.json());
}

export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const chatId = req.nextUrl.searchParams.get("chatId");
  const apiResponse = await fetch(UPDATE_USER_CHAT_ID(userId!), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      chatId: chatId!,
      "X-API-KEY": getApiKey(),
    },
  });
  if (!apiResponse.ok) {
    return new NextResponse(await apiResponse.text(), {
      status: apiResponse.status,
    });
  }
  return NextResponse.json(await apiResponse.text());
}
