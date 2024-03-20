import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface LineChartProps{
  data: {time: number, value: number}[]
}

export default function MessageLineChart({data}: LineChartProps) {
  return (
    <ResponsiveContainer className="w-full h-full">
        <LineChart className='w-full h-full'
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time"/>
          <YAxis />
          <Tooltip wrapperClassName="rounded-xl ring-2 ring-black font-semibold dark:text-black"/>
          <Line type="monotone" dataKey="value" stroke="#000000" />
        </LineChart>
      </ResponsiveContainer>
  )
}
