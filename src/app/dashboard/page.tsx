'use client';

import { StatsCards } from '@/components/dashboard/stats-cards';
import { InventoryChart } from '@/components/dashboard/inventory-chart';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';

export default function DashboardPage() {
  const firestore = useFirestore();

  const inventoryQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'inventories')) : null),
    [firestore]
  );
  const { data: inventoryData, isLoading: inventoryLoading } = useCollection(inventoryQuery);

  const ordersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'orders')) : null),
    [firestore]
  );
  const { data: ordersData, isLoading: ordersLoading } = useCollection(ordersQuery);

  return (
    <div className="grid gap-6">
      <StatsCards inventoryData={inventoryData} ordersData={ordersData} inventoryLoading={inventoryLoading} ordersLoading={ordersLoading} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales This Year</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={ordersData} isLoading={ordersLoading} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryChart data={inventoryData} isLoading={inventoryLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
