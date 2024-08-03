"use server";

import { getSession } from "@/actions/auth-actions";
import apiClient from "@/lib/axios-client";
import { Queue, QueueSchema } from "@/schemas/queue-schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getQueues() {
  const session = await getSession();
  if (!session) return [];
  const chatId = session.user.chatId;
  if (!chatId) return [];
  const res = await apiClient.get("/queues", {
    headers: { chatId: chatId.toString() },
  });
  const GetQueuesSchema = z.array(QueueSchema);
  return GetQueuesSchema.parse(res.data);
}

export async function createQueue(name: string, mixed: boolean) {
  const session = await getSession();
  if (!session) return;
  const chatId = session.user.chatId;
  if (!chatId) return;
  await apiClient.post(
    "/queues",
    { name, mixed },
    { headers: { chatId: chatId.toString() } },
  );
  revalidatePath("/queues");
}

export async function shuffleQueue(queueId: string) {
  const session = await getSession();
  if (!session) return;
  const chatId = session.user.chatId;
  if (!chatId) return;
  await apiClient.post(`/queues/shuffle/${queueId}`, {
    headers: { chatId: chatId.toString() },
  });
  revalidatePath("/queues");
}

//TODO: Update is not working somehow
export async function updateQueue(queue: Queue) {
  const session = await getSession();
  if (!session) return;
  const queueDto = QueueSchema.omit({ pinned: true }).parse(queue);
  await apiClient.put("/queues", queueDto, {
    headers: {
      chatId: session.user.chatId.toString(),
      userId: session.user.accountId.toString(),
    },
  });

  revalidatePath("/queues");
}

export async function removeQueue(queueId: string, mixed: boolean) {
  const session = await getSession();
  if (!session) return;
  const headers = {
    chatId: session.user.chatId.toString(),
    userId: session.user.accountId.toString(),
  };
  if (mixed) {
    await apiClient.delete(`/queues/mixed/${queueId}`, { headers });
  } else {
    await apiClient.delete(`/queues/simple/${queueId}`, { headers });
  }
  revalidatePath("/queues");
}
