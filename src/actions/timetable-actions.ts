"use server";

import apiClient from "@/lib/axios-client";
import { Timetable, TimetableSchema } from "@/schemas/timetable-schema";
import { getSession } from "@/actions/auth-actions";
import { revalidatePath } from "next/cache";

export async function getTimetable() {
  const chatId = (await getSession())?.user.chatId?.toString();
  const res = await apiClient.get("/timetables/retrieve", {
    headers: { chatId },
  });
  return TimetableSchema.parse(res.data);
}

export async function updateTimetable(timetable: Timetable) {
  const chatId = (await getSession())?.user.chatId?.toString();
  await apiClient.put("/timetables/update", timetable, { headers: { chatId } });
  revalidatePath("/timetable");
}

export async function createTimetable(timetable: Timetable) {
  const chatId = (await getSession())?.user.chatId?.toString();
  await apiClient.post("/timetables/create", timetable, {
    headers: { chatId },
  });
  revalidatePath("/timetable");
}

export async function deleteTimetable() {
  const chatId = (await getSession())?.user.chatId?.toString();
  await apiClient.delete("/timetables/delete", { headers: { chatId } });
  revalidatePath("/timetable");
}
