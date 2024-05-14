"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageInfo } from "@/shared/types";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUsersStore } from "../stores/users";

type WeekMessageInfo = {
  day: string;
  value: number;
  average: number;
};

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getWeekMessageInfo(msgInfos: MessageInfo[]): WeekMessageInfo[] {
  const weekMessageInfo: WeekMessageInfo[] = [];
  for (let i = 0; i < days.length; i++)
    weekMessageInfo.push({ day: days[i], value: 0, average: 0 });
  msgInfos.forEach((msg) => {
    for (const [key, value] of Object.entries(msg.dailyMessages)) {
      const day = new Date(key).toString().split(" ")[0].toUpperCase();
      weekMessageInfo[weekMessageInfo.findIndex((x) => x.day == day)].value +=
        Number(value);
    }
  });

  return weekMessageInfo;
}

function getAverageWeekMessageInfo(msgInfos: MessageInfo[]): WeekMessageInfo[] {
  const weekMessageInfo: WeekMessageInfo[] = [];
  for (let i = 0; i < days.length; i++)
    weekMessageInfo.push({ day: days[i], value: 0, average: 0 });
  msgInfos.forEach((msg) => {
    for (const [key, value] of Object.entries(msg.averageDailyMessages)) {
      const day = new Date(key).toString().split(" ")[0].toUpperCase();
      weekMessageInfo[weekMessageInfo.findIndex((x) => x.day == day)].average +=
        Number(value);
    }
  });

  return weekMessageInfo;
}

export default function AverageMessageAreaChart() {
  const [data, setData] = useState<WeekMessageInfo[]>([]);
  const usersStore = useUsersStore();

  useEffect(() => {
    if (!usersStore.chatId) return;
    const d = new Date();
    const today = d.toISOString().split("T")[0];
    d.setDate(d.getDate() - 7);
    const weekAgo = d.toISOString().split("T")[0];
    fetch(
      `/api/statistics/messages?chatId=${usersStore.chatId}&startDate=${weekAgo}&endDate=${today}`
    )
      .then((res) => res.json())
      .then((data: MessageInfo[]) => {
        const currentData = getWeekMessageInfo(data);
        const averatedData = getAverageWeekMessageInfo(data);
        const newData: WeekMessageInfo[] = [];
        for (let i = 0; i < currentData.length; i++) {
          newData.push({
            day: currentData[i].day,
            value: currentData[i].value,
            average: averatedData[i].average,
          });
        }
        setData(newData);
      });
  }, [usersStore.chatId]);

  return (
    <Card className="col-span-4 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          Comparison of week messages
          <span>
            Total average: {data.reduce((acc, { average }) => acc + average, 0)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip wrapperClassName="rounded-xl ring-2 ring-black font-semibold text-black [&_*]:text-black"></Tooltip>
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--foreground))"
              strokeWidth={4}
              fill="hsl(var(--foreground))"
            />
            <Area
              type="monotone"
              dataKey="average"
              stroke="hsl(var(--foreground))"
              fill="hsl(var(--foreground))"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
