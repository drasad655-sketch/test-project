'use client';

import { useState } from 'react';
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
import { InventoryAnomalyDetector } from './anomaly-detector';

type EnrichedInventory = {
    id: string;
    lotNumber: string;
    quantity: number;
    expirationDate: string;
    name: string;
    expectedQuantity: number;
    historicalData: { date: string; quantity: number }[];
};

export function InventoryTable({ inventory }: { inventory: EnrichedInventory[] }) {
  const [selectedProduct, setSelectedProduct] =
    useState<EnrichedInventory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnomalyCheck = (product: EnrichedInventory) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const getBadgeVariant = (dateStr: string) => {
    const expDate = new Date(dateStr);
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    if (expDate < today) return 'destructive';
    if (expDate < threeMonthsFromNow) return 'secondary';
    return 'default';
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Lot Number</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Expiration Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.lotNumber}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(new Date(item.expirationDate).toLocaleDateString())}>
                  {new Date(item.expirationDate).toLocaleDateString()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAnomalyCheck(item)}
                >
                  Check Anomaly
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedProduct && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Anomaly Detection for {selectedProduct.name}
              </DialogTitle>
            </DialogHeader>
            <InventoryAnomalyDetector
              product={{
                id: selectedProduct.id,
                name: selectedProduct.name,
                lotNumber: selectedProduct.lotNumber,
                quantity: selectedProduct.quantity,
                expectedQuantity: selectedProduct.expectedQuantity,
                expirationDate: selectedProduct.expirationDate,
                historicalData: selectedProduct.historicalData,
              }}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
