"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getMessagesPerDay } from "@/actions/statistics-actions";

type DayTimeInfo = {
  time: number;
  value: number;
};

function getPreviousDay(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
}

export default function MessageLineChart() {
  const [data, setData] = useState<DayTimeInfo[]>([]);

  useEffect(() => {
    getMessagesPerDay().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-col gap-2 md:flex-row">
            <span>Number of messages throughout the day.</span>
            <span className="text-nowrap text-base font-normal text-blue-500">
              ({getPreviousDay()})
            </span>
          </div>
          <span className="text-nowrap">
            Total: {data.reduce((acc, { value }) => acc + value, 0)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody className="w-full">
        <div className="h-full w-full">
          <ResponsiveContainer className="h-full w-full">
            <LineChart
              className="h-full w-full"
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
