'use client';
import { ShipmentsTable } from '@/components/supply-chain/shipments-table';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import Loading from './loading';
import { AddShipmentForm } from '@/components/supply-chain/add-shipment-form';

export default function SupplyChainPage() {
  const firestore = useFirestore();
  const shipmentsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'supplyChains') : null),
    [firestore]
  );

  const { data, isLoading } = useCollection(shipmentsQuery);

  if (isLoading) {
    return <Loading />;
  }

  const shipments =
    data?.map((d) => ({
      id: d.id,
      origin: d.supplier,
      destination: d.distributionChannel,
      status: d.status || 'In Transit', // Default to 'In Transit' if status is missing
      estimatedDelivery: d.estimatedDelivery || new Date().toLocaleDateString(), // Default to today if missing
      shipmentData: `From ${d.supplier} via ${d.transportationMethod}`,
      expectedTransitTime: d.expectedTransitTime || '5-7 days', // Default
      expectedTemperatureRange: d.expectedTemperatureRange || '2-8°C', // Default
    })) || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Supply Chain Management</h1>
        <AddShipmentForm />
      </div>
      <ShipmentsTable shipments={shipments} />
    </div>
  );
}
