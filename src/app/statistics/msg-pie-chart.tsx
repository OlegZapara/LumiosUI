"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageInfo } from "@/shared/types";
import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useUsersStore } from "../stores/users";

interface LabelProps {
  index: number;
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}: LabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      style={{ fill: "hsl(var(--background))" }}
      dominantBaseline="central"
    >
      {index + 1}
    </text>
  );
};

const CustomTooltip = ({ active, payload, username }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white px-4 py-3 ring-2 ring-black font-semibold text-black [&_*]:text-black">
        <p className="label">{`${payload[0].payload.username} : ${payload[0].value} messages`}</p>
      </div>
    );
  }

  return null;
};

export default function MessagePieChart() {
  const [data, setData] = useState<MessageInfo[]>([]);
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
      .then((data: MessageInfo[]) =>
        setData(data.sort((a, b) => b.messages - a.messages).slice(0, 10))
      );
  }, [usersStore.chatId]);

  return (
    <Card className="col-span-4 row-span-3 md:row-span-1">
      <CardHeader>
        <CardTitle>
          Message overview (number of messages per person in last week)
        </CardTitle>
      </CardHeader>
      <CardBody className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-4 md:col-span-1 flex flex-col justify-center items-end">
          <div className="flex flex-col items-start w-auto">
            {data.slice(0, 5).map((data, i) => (
              <div
                className="py-2 px-4 font-semibold text-lg flex flex-row justify-between gap-6 w-full"
                key={data.username}
              >
                <div>
                  {i + 1}. {data.username}
                </div>
                <div className="underline">{data.messages}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 md:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={500}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                className="focus:outline-none"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                dataKey="messages"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        stroke: "hsl(var(--background))",
                        opacity: 0.75 + Math.random() * 0.25,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-4 md:col-span-1 flex flex-col justify-center items-start">
          <div className="flex flex-col items-start w-auto">
            {data.slice(5, 10).map((data, i) => (
              <div
                className="py-2 px-4 font-semibold text-lg flex flex-row justify-between gap-6 w-full"
                key={data.username}
              >
                <div>
                  {i + 6}. {data.username}
                </div>
                <div className="underline">{data.messages}</div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
