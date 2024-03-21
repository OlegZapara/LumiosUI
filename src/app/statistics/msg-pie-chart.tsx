import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type DataType = {
  name: string;
  value: number;
};

interface MessagePieChartProps {
  data: DataType[];
}

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

export default function MessagePieChart(props: MessagePieChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          Message overview (number of messages per person in last week)
        </CardTitle>
      </CardHeader>
      <CardBody className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-1 flex flex-col justify-center items-end">
          <div className="flex flex-col items-start w-auto">
            {props.data.slice(0, 5).map((data, i) => (
              <div
                className="py-2 px-4 font-semibold text-lg flex flex-row justify-between gap-6 w-full"
                key={data.name}
              >
                <div>
                  {i + 1}. {data.name}
                </div>
                <div className="underline">{data.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={500}>
              <Pie
                data={props.data}
                cx="50%"
                cy="50%"
                className="focus:outline-none"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                dataKey="value"
              >
                {props.data.map((entry, index) => (
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
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-start">
          <div className="flex flex-col items-start w-auto">
            {props.data.slice(5, 10).map((data, i) => (
              <div
                className="py-2 px-4 font-semibold text-lg flex flex-row justify-between gap-6 w-full"
                key={data.name}
              >
                <div>
                  {i + 6}. {data.name}
                </div>
                <div className="underline">{data.value}</div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
