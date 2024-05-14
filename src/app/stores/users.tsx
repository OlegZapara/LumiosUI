import { TelegramUser } from "@/shared/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UsersState = {
  user: TelegramUser | null;
  userId: number | null;
  chatId: number | null;
};

type UsersActions = {
  fetchUser: (userId: number) => Promise<TelegramUser>;
  setUserId: (userId: number) => Promise<void>;
  updateChatId: (chatId: number) => Promise<void>;
  logout: () => void;
};

const initialState: UsersState = {
  user: null,
  userId: null,
  chatId: null,
};

export const useUsersStore = create(
  persist<UsersState & UsersActions>(
    (set, get) => ({
      ...initialState,
      fetchUser: async (userId: number) => {
        const response = await fetch(`api/user?userId=${userId}`);
        const data = await response.json();
        set({ user: data });
        console.log(data);
        return data;
      },
      setUserId: async (userId: number) => {
        const response = await fetch(`/api/chatId?userId=${userId}`);
        const chatId: unknown = await response.json();
        if (typeof chatId !== "number")
          throw new Error(
            `ChatId is of type ${typeof chatId} (expected number)`
          );
        set({ userId, chatId });
        await get().fetchUser(userId);
      },
      updateChatId: async (chatId: number) => {
        await fetch(`/api/chatId?userId=${get().userId}&chatId=${chatId}`, {
          method: "POST",
        });
        set({ chatId });
      },
      logout: () => {
        set({ ...initialState });
      },
    }),
    {
      name: "users",
    }
  )
);
