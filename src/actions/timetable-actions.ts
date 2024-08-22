"use server";

import apiClient from "@/lib/axios-client";
import { Timetable, TimetableSchema } from "@/schemas/timetable-schema";
import { getSession } from "@/actions/auth-actions";
import { revalidatePath } from "next/cache";

export async function getTimetable() {
  const session = await getSession();
  if (!session) return [];
  const chatId = session.user.chatId?.toString();
  if (!chatId) return [];
  const res = await apiClient.get("/timetables/retrieve", {
    headers: { chatId },
  });
  return TimetableSchema.parse(res.data);
}

export async function updateTimetable(timetable: Timetable) {
  const session = await getSession();
  if (!session) return;
  const chatId = session.user.chatId;
  if (!chatId) return;
  await apiClient.put("/timetables/update", timetable, {
    headers: { chatId: chatId.toString() },
  });
  revalidatePath("/timetable");
}

export async function createTimetable(timetable: Timetable) {
  const session = await getSession();
  if (!session) return;
  const chatId = session.user.chatId?.toString();
  if (!chatId) return;
  await apiClient.post("/timetables/create", timetable, {
    headers: { chatId: chatId.toString() },
  });
  revalidatePath("/timetable");
}

export async function deleteTimetable() {
  const session = await getSession();
  if (!session) return;
  const chatId = session.user.chatId;
  if (!chatId) return;
  await apiClient.delete("/timetables/delete", {
    headers: { chatId: chatId.toString() },
  });
  revalidatePath("/timetable");
}
