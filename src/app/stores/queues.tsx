import { Queue } from "@/shared/types";
import { produce } from "immer";
import { create } from "zustand";

interface QueuesStore {
  queues: Queue[];
  pinQueue: (id: string) => void;
  unpinQueue: (id: string) => void;
  fetchQueues: () => Promise<Queue[]>;
  createQueue: (title: string, isMixed: boolean) => Promise<void>;
  updateQueue: (queue: Queue) => Promise<void>;
  removeQueue: (queueId: string, isMixed: boolean) => Promise<void>;
}

export const useQueuesStore = create<QueuesStore>((set, get) => ({
  queues: [],
  pinQueue: (id: string) => {
    const pinnedQueues: string[] = JSON.parse(
      localStorage.getItem("pinnedQueues") ?? "[]"
    );
    pinnedQueues.push(id);
    localStorage.setItem("pinnedQueues", JSON.stringify(pinnedQueues));
    set((state) => ({
      queues: produce(state.queues, (newState) => {
        const pinnedId = newState.findIndex((x) => x.id == id);
        newState[pinnedId].pinned = true;
      }),
    }));
  },
  unpinQueue: (id: string) => {
    let pinnedQueues: string[] = JSON.parse(
      localStorage.getItem("pinnedQueues") ?? "[]"
    );
    pinnedQueues = pinnedQueues.filter((x) => x != id);
    localStorage.setItem("pinnedQueues", JSON.stringify(pinnedQueues));
    set((state) => ({
      queues: produce(state.queues, (newState) => {
        const pinnedId = newState.findIndex((x) => x.id == id);
        newState[pinnedId].pinned = false;
      }),
    }));
  },
  fetchQueues: async () => {
    const chatId = localStorage.getItem("chatId");
    const pinnedQueues: string[] = JSON.parse(
      localStorage.getItem("pinnedQueues") ?? "[]"
    );
    const response = await fetch(`/api/queues?chatId=${chatId}`);
    const data: Queue[] = await response.json();
    data.forEach((_, i) => {
      data[i].pinned = pinnedQueues.includes(data[i].id);
    });
    set({ queues: data });
    return data;
  },
  createQueue: async (name: string, isMixed: boolean) => {
    const chatId = localStorage.getItem("chatId");
    const res = await fetch(`/api/queues?chatId=${chatId}`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        mixed: isMixed,
      }),
    });
    await get().fetchQueues();
  },
  updateQueue: async (queue: Queue) => {
    const chatId = localStorage.getItem("chatId");
    await fetch(`/api/queues?chatId=${chatId}`, {
      method: "PUT",
      body: JSON.stringify(queue),
    });
    await get().fetchQueues();
  },
  removeQueue: async (queueId: string, isMixed: boolean) => {
    const chatId = localStorage.getItem("chatId");
    await fetch(
      `/api/queues?chatId=${chatId}&queueId=${queueId}&isMixed=${isMixed}`,
      {
        method: "DELETE",
      }
    );
    await get().fetchQueues();
  },
}));
