import { CardBody } from '@/components/ui/3d-card'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AreaChartProps {
  data: { day: string; value: number, average: number }[];
}

export default function AverageMessageAreaChart({data}: AreaChartProps) {
  return (
    <Card className="col-span-2">
    <CardHeader>
      <CardTitle>
        Comparison of week messages
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
          <Tooltip wrapperClassName="rounded-xl ring-2 ring-black font-semibold dark:text-black"></Tooltip>
          <Area type="monotone" dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={4} fill="hsl(var(--foreground))" />
          <Area type="monotone" dataKey="average" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground))" />
        </AreaChart>
      </ResponsiveContainer>
    </CardBody>
  </Card>
  )
}
