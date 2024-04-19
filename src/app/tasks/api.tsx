"use client";

import { Task } from "@/shared/types";

export const getAllTasks = async (chatId: string) => {
  const apiResponse = await fetch(`/api/tasks?chatId=${chatId}`, {
    method: "GET",
  });
  if (!apiResponse.ok) return [];
  return await apiResponse.json();
};

export const createTask = async (chatId: string, task: Task) => {
  const apiResponse = await fetch(`/api/tasks?chatId=${chatId}`, {
    method: "POST",
    body: JSON.stringify(task),
  });
  return apiResponse;
};

export const updateTask = async (chatId: string, task: Task) => {
  const apiResponse = await fetch(
    `/api/tasks?chatId=${chatId}&taskId=${task.id}`,
    {
      method: "PUT",
      body: JSON.stringify(task),
    }
  );
  return apiResponse;
};

export const deleteTask = async (chatId: string, taskId: string) => {
  const apiResponse = await fetch(
    `/api/tasks?chatId=${chatId}&taskId=${taskId}`,
    {
      method: "DELETE",
    }
  );
  return apiResponse;
};
