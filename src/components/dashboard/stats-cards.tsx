'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Boxes, DollarSign, ShoppingCart, Truck } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useMemo } from 'react';

export function StatsCards({
  inventoryData,
  ordersData,
  inventoryLoading,
  ordersLoading,
}: {
  inventoryData: any[] | null;
  ordersData: any[] | null;
  inventoryLoading: boolean;
  ordersLoading: boolean;
}) {
  const firestore = useFirestore();

  const supplyChainsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'supplyChains')) : null),
    [firestore]
  );
  const { data: supplyChains, isLoading: supplyChainsLoading } =
    useCollection(supplyChainsQuery);

  const totalRevenue = useMemo(() => {
    if (!ordersData) return 0;
    return ordersData.reduce((acc, order) => acc + order.totalAmount, 0);
  }, [ordersData]);

  const activeOrders = useMemo(() => {
    if (!ordersData) return 0;
    return ordersData.filter((order) => order.status === 'Pending').length;
  }, [ordersData]);

  const inventoryCount = useMemo(() => {
    if (!inventoryData) return 0;
    return inventoryData.reduce((acc, item) => acc + item.quantity, 0);
  }, [inventoryData]);

  const shipmentsInTransit = useMemo(() => {
    if (!supplyChains) return 0;
    // This is a mock value as status is not in the supplyChain schema
    return supplyChains.length;
  }, [supplyChains]);

  const isLoading = inventoryLoading || ordersLoading || supplyChainsLoading;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-3/4" />
          ) : (
            <>
              <div className="text-2xl font-bold">
                {totalRevenue.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                from {ordersData?.length || 0} orders
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-1/2" />
          ) : (
            <>
              <div className="text-2xl font-bold">+{activeOrders}</div>
              <p className="text-xs text-muted-foreground">
                Pending orders
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Count</CardTitle>
          <Boxes className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-1/2" />
          ) : (
            <>
              <div className="text-2xl font-bold">{inventoryCount}</div>
              <p className="text-xs text-muted-foreground">
                units across {inventoryData?.length || 0} products
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Shipments In-Transit
          </CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-1/2" />
          ) : (
            <>
              <div className="text-2xl font-bold">+{shipmentsInTransit}</div>
              <p className="text-xs text-muted-foreground">
                Total shipments
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
