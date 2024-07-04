"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getMessagesPerWeek } from "@/actions/statistics-actions";

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

  useEffect(() => {
    getMessagesPerWeek("normal").then((data) => {
      setData(data);
    });
  }, []);
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
          <div className="h-full w-full">
            <ResponsiveContainer className="h-full w-full">
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
