'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { analyticsData } from '@/lib/data';
import { format } from 'date-fns';

const chartConfig = {
  tasksCompleted: {
    label: "المهام المنجزة",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ProductivityChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer>
        <AreaChart
          data={analyticsData.productivity}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), "d MMM")}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis allowDecimals={false} reversed />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="tasksCompleted"
            stroke={chartConfig.tasksCompleted.color}
            fillOpacity={0.4}
            fill={chartConfig.tasksCompleted.color}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
