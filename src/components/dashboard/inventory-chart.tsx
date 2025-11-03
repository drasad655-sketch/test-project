'use client';

import * as React from 'react';
import { Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
  units: {
    label: 'Units',
  },
  pharmaceuticals: {
    label: 'Pharmaceuticals',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function InventoryChart({
  data,
  isLoading,
}: {
  data: any[] | null;
  isLoading: boolean;
}) {
  const chartData = React.useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({
      product: item.name,
      units: item.quantity,
      fill: `hsl(var(--chart-${(data.indexOf(item) % 5) + 1}))`,
    }));
  }, [data]);
  
  const config = React.useMemo(() => {
    if (!data) return chartConfig;
    const productConfig = data.reduce((acc, item, index) => {
        const key = item.name || `product-${index}`;
        acc[key] = {
            label: item.name,
            color: `hsl(var(--chart-${(index % 5) + 1}))`
        };
        return acc;
    }, {} as ChartConfig);

    return { ...chartConfig, ...productConfig };
  }, [data]);


  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square min-h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="units"
          nameKey="product"
          innerRadius={60}
          strokeWidth={5}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="product" />}
          className="-mt-4"
        />
      </PieChart>
    </ChartContainer>
  );
}
