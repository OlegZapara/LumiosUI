import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageInfo } from "@/shared/types";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUsersStore } from "../stores/users";

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
${x + width / 2}, ${y}
C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

type WeekMessageInfo = {
  day: string;
  value: number;
};

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getWeekMessageInfo(msgInfos: MessageInfo[]): WeekMessageInfo[] {
  const weekMessageInfo: WeekMessageInfo[] = [];
  for (let i = 0; i < days.length; i++)
    weekMessageInfo.push({ day: days[i], value: 0 });
  msgInfos.forEach((msg) => {
    for (const [key, value] of Object.entries(msg.dailyMessages)) {
      const day = new Date(key).toString().split(" ")[0].toUpperCase();
      weekMessageInfo[weekMessageInfo.findIndex((x) => x.day == day)].value +=
        Number(value);
    }
  });

  return weekMessageInfo;
}

function getDayFill(currentDay: string): string {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentDayIndex = days.indexOf(currentDay);
  if (dayIndex == currentDayIndex + 1) return "rgb(59, 130, 246)";
  else if (dayIndex <= currentDayIndex) return "hsl(var(--muted-foreground))";
  else return "hsl(var(--foreground))";
}

export default function MessageBarChart() {
  const [data, setData] = useState<WeekMessageInfo[]>([]);
  const usersStore = useUsersStore();

  useEffect(() => {
    if (!usersStore.chatId) return;
    const d = new Date();
    const today = d.toISOString().split("T")[0];
    d.setDate(d.getDate() - 7);
    const weekAgo = d.toISOString().split("T")[0];
    fetch(
      `/api/statistics/messages?chatId=${usersStore.chatId}&startDate=${weekAgo}&endDate=${today}`,
    )
      .then((res) => res.json())
      .then((data: MessageInfo[]) => setData(getWeekMessageInfo(data)));
  }, [usersStore.chatId]);
  return (
    <>
      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2">
            Number of messages throughout the week
            <span>
              Total: {data.reduce((acc, { value }) => acc + value, 0)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardBody className="w-full">
          <div className="w-full h-full">
            <ResponsiveContainer className="w-full h-full">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperClassName="rounded-xl ring-2 ring-black font-semibold text-black [&_*]:text-black"></Tooltip>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--foreground))"
                  shape={<TriangleBar />}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getDayFill(entry.day)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
