"use server";

import { getSession } from "@/actions/auth-actions";
import apiClient from "@/lib/axios-client";
import {
  MessageResponseSchema,
  RatingInfo,
  RatingResponseSchema,
} from "@/schemas/statistics-schema";

function nDaysBefore(n: number) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
}

async function ratingStatistics(date: string) {
  const chatId = (await getSession())?.user.chatId;
  const res = await apiClient.get(
    `/records/rating?chatId=${chatId}&date=${date}`,
  );
  return RatingResponseSchema.parse(res.data);
}

async function getMessagesStatistics(start: string, end: string) {
  const chatId = (await getSession())?.user.chatId;
  const res = await apiClient.get(
    `/records/messages?chatId=${chatId}&startDate=${start}&endDate=${end}`,
  );
  return MessageResponseSchema.parse(res.data);
}

export async function getRatingStatistics() {
  const data = await ratingStatistics(nDaysBefore(1));
  const minRating = Math.floor(Math.max(...data.map((x) => x.reverence)) / 200);
  return data
    .filter((x) => x.reverence > (data.length > 5 ? minRating : 5))
    .sort((a, b) => (a.username || "").localeCompare(b.username || ""));
}

export async function getRatingDiffStatistics() {
  const [today, weekAgo] = await Promise.all([
    ratingStatistics(nDaysBefore(1)),
    ratingStatistics(nDaysBefore(8)),
  ]);
  const getRatingDiff = (i1: RatingInfo, i2: RatingInfo | undefined) => {
    if (!i2) return i1;
    return { ...i1, reverence: i1.reverence - i2.reverence };
  };
  return today
    .map((now) => {
      const before = weekAgo.find((x) => x.userId === now.userId);
      return getRatingDiff(now, before);
    })
    .sort((a, b) => b.reverence - a.reverence);
}

export async function getMessagesPerUser() {
  const data = await getMessagesStatistics(nDaysBefore(8), nDaysBefore(1));
  return data.sort((a, b) => b.messages - a.messages).slice(0, 10);
}

export async function getMessagesPerDay() {
  const data = await getMessagesStatistics(nDaysBefore(2), nDaysBefore(1));
  const info = Array.from({ length: 24 }, (_, i) => ({ time: i, value: 0 }));
  data.forEach((msg) => {
    const timeInformation = msg.dayMessages[Object.keys(msg.dayMessages)[0]];
    Object.entries(timeInformation).forEach(([key, value]) => {
      const time = parseInt(key);
      if (info[time]) info[time].value += Number(value);
    });
  });
  return info;
}

export async function getMessagesPerWeek(option: "normal" | "average") {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const accessKey = option === "normal" ? "value" : "average";
  const data = await getMessagesStatistics(nDaysBefore(8), nDaysBefore(1));
  const info = days.map((day) => ({ day, value: 0, average: 0 }));
  data.forEach((msg) => {
    Object.entries(msg.dailyMessages).forEach(([key, value]) => {
      const day = new Date(key).toString().split(" ")[0].toUpperCase();
      info[info.findIndex((x) => x.day === day)][accessKey] += Number(value);
    });
  });
  return info;
}
