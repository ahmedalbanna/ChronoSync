'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartTooltipContent } from "@/components/ui/chart"
import { analyticsData } from '@/lib/data';

const chartConfig = {
  value: {
    label: "Hours",
  },
  meetings: {
    label: "Meetings",
    color: "hsl(var(--chart-1))",
  },
  deepWork: {
    label: "Deep Work",
    color: "hsl(var(--chart-2))",
  },
  communication: {
    label: "Communication",
    color: "hsl(var(--chart-3))",
  },
  breaks: {
    label: "Breaks",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function TimeAllocationChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={analyticsData.timeAllocation}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const RADIAN = Math.PI / 180
              const radius = 12 + innerRadius + (outerRadius - innerRadius)
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)
              return (
                <text
                  x={x}
                  y={y}
                  className="fill-muted-foreground text-xs"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {analyticsData.timeAllocation[index].name} ({value}%)
                </text>
              )
            }}
          >
            {analyticsData.timeAllocation.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
