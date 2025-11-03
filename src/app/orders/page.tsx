'use client';
import { OrdersTable } from '@/components/orders/orders-table';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import Loading from './loading';
import { AddOrderForm } from '@/components/orders/add-order-form';

export default function OrdersPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  const ordersQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'orders') : null),
    [firestore]
  );
  const { data: orders, isLoading } = useCollection(ordersQuery);

  const customersQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'customers') : null),
    [firestore]
  );
  const { data: customers, isLoading: customersLoading } =
    useCollection(customersQuery);

  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'pharmaceuticals') : null),
    [firestore]
  );
  const { data: products, isLoading: productsLoading } =
    useCollection(productsQuery);

  if (isLoading || customersLoading || productsLoading) {
    return <Loading />;
  }

  const ordersWithCustomerName = orders?.map((order) => {
    const customer = customers?.find((c) => c.id === order.customerId);
    return {
      ...order,
      customerName: customer?.name || 'Unknown Customer',
      date: new Date(order.orderDate).toLocaleDateString(),
      total: order.totalAmount,
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <AddOrderForm customers={customers || []} products={products || []} />
      </div>
      <OrdersTable orders={ordersWithCustomerName || []} />
    </div>
  );
}
