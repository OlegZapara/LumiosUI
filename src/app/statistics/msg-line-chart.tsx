import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageInfo } from "@/shared/types";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUsersStore } from "../stores/users";

type DayTimeInfo = {
  time: number;
  value: number;
};

function getDayTimeInfo(msgInfos: MessageInfo[]): DayTimeInfo[] {
  const dayTimeInfo: DayTimeInfo[] = [];
  for (let i = 0; i <= 23; i++) dayTimeInfo.push({ time: i, value: 0 });
  msgInfos.forEach((msg) => {
    const keys = Object.keys(msg.dayMessages);
    const timeInformation = msg.dayMessages[keys[0]];
    for (const [key, value] of Object.entries(timeInformation)) {
      const time = parseInt(key);
      dayTimeInfo[dayTimeInfo.findIndex((x) => x.time == time)].value +=
        Number(value);
    }
  });
  return dayTimeInfo;
}

export default function MessageLineChart() {
  const [data, setData] = useState<DayTimeInfo[]>([]);
  const usersStore = useUsersStore();

  useEffect(() => {
    if (!usersStore.chatId) return;
    const d = new Date();
    const today = d.toISOString().split("T")[0];
    d.setDate(d.getDate() - 1);
    const dayAgo = d.toISOString().split("T")[0];
    fetch(
      `/api/statistics/messages?chatId=${usersStore.chatId}&startDate=${dayAgo}&endDate=${today}`
    )
      .then((res) => res.json())
      .then((data: MessageInfo[]) => setData(getDayTimeInfo(data)));
  }, [usersStore.chatId]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          Number of messages throughout the day.
          <span>Total: {data.reduce((acc, { value }) => acc + value, 0)}</span>
        </CardTitle>
      </CardHeader>
      <CardBody className="w-full">
        <div className="w-full h-full">
          <ResponsiveContainer className="w-full h-full">
            <LineChart
              className="w-full h-full"
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip wrapperClassName="rounded-xl ring-2 ring-black font-semibold dark:text-black" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="000000"
                className="stroke-foreground"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
