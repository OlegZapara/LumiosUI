import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartProps {
  data: { time: number; value: number }[];
}

export default function MessageLineChart({ data }: LineChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          Number of messages throughout the day (total:{" "}
          {data.reduce((acc, { value }) => acc + value, 0)})
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
