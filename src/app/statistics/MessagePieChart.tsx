import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function shuffleArray(array: Array<any>) {
  return array.sort(() => Math.random() - 0.5);
}

const COLORS = [
  "#000000", // Black
  "#0a0a0a", // 90% Black
  "#141414", // 80% Black
  "#1e1e1e", // 70% Black
  "#282828", // 60% Black
  // "#323232", // 50% Black
  // "#3c3c3c", // 40% Black
  // "#464646", // 30% Black
  // "#505050", // 20% Black
  // "#5a5a5a", // 10% Black
];
shuffleArray(COLORS)

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
    <text  x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} className="text-white" fill="white" dominantBaseline="central">
      {index + 1}
    </text>
  );
};

export default function MessagePieChart(props: MessagePieChartProps) {
  return (
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
          fill="#8884d8"
          dataKey="value"
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
