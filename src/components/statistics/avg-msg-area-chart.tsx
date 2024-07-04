"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getMessagesPerWeek } from "@/actions/statistics-actions";

type WeekMessageInfo = {
  day: string;
  value: number;
  average: number;
};

export default function AverageMessageAreaChart() {
  const [data, setData] = useState<WeekMessageInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [normal, average] = await Promise.all([
        getMessagesPerWeek("normal"),
        getMessagesPerWeek("average"),
      ]);

      const newData = normal.map((n, i) => ({
        day: n.day,
        value: n.value,
        average: average[i].average,
      }));

      setData(newData);
    };
    fetchData();
  }, []);

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
