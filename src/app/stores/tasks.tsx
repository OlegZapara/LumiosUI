import { Task } from "@/shared/types";
import { create } from "zustand";
import { useUsersStore } from "./users";

interface TasksState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  fetchTasks: async () => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    const response = await fetch(`/api/tasks?chatId=${chatId}`);
    const data = await response.json();
    set({ tasks: data });
  },
  createTask: async (task: Task) => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    await fetch(`/api/tasks?chatId=${chatId}`, {
      method: "POST",
      body: JSON.stringify(task),
    });
    await get().fetchTasks();
  },
  updateTask: async (task: Task) => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    await fetch(`/api/tasks?chatId=${chatId}&taskId=${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });
    await get().fetchTasks();
  },
  removeTask: async (taskId: string) => {
    const chatId = localStorage.getItem("chatId");
    await fetch(`/api/tasks?chatId=${chatId}&taskId=${taskId}`, {
      method: "DELETE",
    });
    await get().fetchTasks();
  },
}));
