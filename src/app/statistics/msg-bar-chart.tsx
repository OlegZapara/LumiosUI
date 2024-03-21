import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface BarChartProps {
  data: { day: string; value: number }[];
}

export default function MessageBarChart({ data }: BarChartProps) {
  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
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

  return (
    <>
      {" "}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>
            Number of messages throughout the week (total:{" "}
            {data.reduce((acc, { value }) => acc + value, 0)})
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
                <XAxis dataKey="day" />
                <YAxis />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--foreground))"
                  shape={<TriangleBar />}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
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
