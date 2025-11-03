'use client';

import { useState } from 'react';
import type { Shipment } from '@/lib/types';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { SupplyChainAnomalyDetector } from './anomaly-detector';

export function ShipmentsTable({ shipments }: { shipments: Shipment[] }) {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnomalyCheck = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsDialogOpen(true);
  };

  const getStatusVariant = (status: Shipment['status']) => {
    switch (status) {
      case 'Delayed':
        return 'destructive';
      case 'Delivered':
        return 'default';
      case 'In Transit':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shipment ID</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Est. Delivery</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-medium">{shipment.id}</TableCell>
              <TableCell>{shipment.origin}</TableCell>
              <TableCell>{shipment.destination}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(shipment.status)}>
                  {shipment.status}
                </Badge>
              </TableCell>
              <TableCell>{shipment.estimatedDelivery}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAnomalyCheck(shipment)}
                >
                  Check Anomaly
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedShipment && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Anomaly Detection for {selectedShipment.id}
              </DialogTitle>
            </DialogHeader>
            <SupplyChainAnomalyDetector shipment={selectedShipment} />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
