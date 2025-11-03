'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function SalesChart({
  data,
  isLoading,
}: {
  data: any[] | null;
  isLoading: boolean;
}) {
  const monthlySales = useMemo(() => {
    if (!data) return [];
    const salesByMonth: { [key: string]: number } = {};
    data.forEach((order) => {
      const month = new Date(order.orderDate).toLocaleString('default', {
        month: 'short',
      });
      if (!salesByMonth[month]) {
        salesByMonth[month] = 0;
      }
      salesByMonth[month] += order.totalAmount;
    });

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return monthOrder.map(month => ({
        month,
        sales: salesByMonth[month] || 0
    })).filter(d => d.sales > 0);

  }, [data]);

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={monthlySales}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
