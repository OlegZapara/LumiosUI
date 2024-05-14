"use client";
import { useUsersStore } from "@/app/stores/users";
import { useEffect, useState } from "react";

export default function useAuth() {
  const usersStore = useUsersStore();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (usersStore.userId && usersStore.chatId && usersStore.user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [usersStore.chatId, usersStore.user, usersStore.userId]);

  return authenticated;
}
