"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getMessagesPerUser } from "@/actions/statistics-actions";
import { MessageInfo } from "@/schemas/statistics-schema";

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
      <div className="rounded-xl bg-white px-4 py-3 font-semibold text-black ring-2 ring-black [&_*]:text-black">
        <p className="label">{`${payload[0].payload.username} : ${payload[0].value} messages`}</p>
      </div>
    );
  }

  return null;
};

export default function MessagePieChart() {
  const [data, setData] = useState<MessageInfo[]>([]);

  useEffect(() => {
    getMessagesPerUser().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Card className="col-span-4 row-span-3 md:row-span-1">
      <CardHeader>
        <CardTitle>
          Message overview (number of messages per person in last week)
        </CardTitle>
      </CardHeader>
      <CardBody className="grid w-full grid-cols-4 gap-4">
        <div className="col-span-4 flex flex-col items-center justify-center md:col-span-1 md:items-end">
          <div className="flex w-auto flex-col items-start">
            {data.slice(0, 5).map((data, i) => (
              <div
                className="flex w-full flex-row justify-between gap-6 px-4 py-2 text-lg font-semibold"
                key={data.username ? data.username : "null"}
              >
                <div>
                  {i + 1}. {data.username ? data.username : "null"}
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
        <div className="col-span-4 flex flex-col items-center justify-center md:col-span-1 md:items-start">
          <div className="flex w-auto flex-col items-start">
            {data.slice(5, 10).map((data, i) => (
              <div
                className="flex w-full flex-row justify-between gap-6 px-4 py-2 text-lg font-semibold"
                key={data.username ? data.username : "null"}
              >
                <div>
                  {i + 6}. {data.username ? data.username : "null"}
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
