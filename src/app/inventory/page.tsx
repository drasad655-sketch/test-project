'use client';
import { InventoryTable } from '@/components/inventory/inventory-table';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import Loading from './loading';
import { AddInventoryForm } from '@/components/inventory/add-inventory-form';

export default function InventoryPage() {
  const firestore = useFirestore();
  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'pharmaceuticals') : null),
    [firestore]
  );
  const { data: products, isLoading: productsLoading } =
    useCollection(productsQuery);

  const inventoryQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'inventories') : null),
    [firestore]
  );
  const { data: inventory, isLoading: inventoryLoading } =
    useCollection(inventoryQuery);

  if (productsLoading || inventoryLoading) {
    return <Loading />;
  }

  const inventoryWithProductDetails = inventory?.map((inv) => {
    const product = products?.find((p) => p.id === inv.pharmaceuticalId);
    return {
      ...inv,
      name: product?.name || 'Unknown Product',
      // Mocking data not available in schema
      expectedQuantity: inv.quantity + 20,
      historicalData: [
        { date: '2024-05-01', quantity: inv.quantity + 50 },
        { date: '2024-04-01', quantity: inv.quantity + 40 },
        { date: '2024-03-01', quantity: inv.quantity + 60 },
      ],
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <AddInventoryForm products={products || []} />
      </div>
      <InventoryTable inventory={inventoryWithProductDetails || []} />
    </div>
  );
}
