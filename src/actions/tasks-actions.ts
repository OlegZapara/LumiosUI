"use server";
import { Task, TaskSchema } from "@/schemas/task-schema";
import { z } from "zod";
import apiClient from "@/lib/axios-client";
import { getSession } from "@/actions/auth-actions";
import { revalidatePath } from "next/cache";

export async function getTasks(chatId: number) {
  const response = await apiClient.get("/tasks", {
    headers: { chatId: chatId.toString() },
  });
  const GetTasksSchema = z.array(TaskSchema);
  return GetTasksSchema.parse(response.data);
}

export async function updateTask(task: Task) {
  const chatId = (await getSession())?.user.chatId!;
  await apiClient.put("/tasks", task, {
    headers: { chatId: chatId.toString(), taskId: task.id.toString() },
  });
  revalidatePath("/tasks");
}

export async function createTask(task: Omit<Task, "id">) {
  const chatId = (await getSession())?.user.chatId!;
  await apiClient.post("/tasks", task, {
    headers: { chatId: chatId.toString() },
  });
  revalidatePath("/tasks");
}

export async function deleteTask(taskId: number) {
  const chatId = (await getSession())?.user.chatId!;
  await apiClient.delete(`/tasks/${taskId}`, {
    headers: { chatId: chatId.toString() },
  });
  revalidatePath("/tasks");
}
