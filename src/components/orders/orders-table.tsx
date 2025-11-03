import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/lib/types';

type EnrichedOrder = Order & {
    customerName: string;
    date: string;
    total: number;
}


export function OrdersTable({ orders }: {orders: EnrichedOrder[]}) {
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Shipped':
        return 'outline';
      case 'Delivered':
        return 'default';
      case 'Processing':
        return 'secondary'
      default:
        return 'outline';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id.substring(0,7)}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {order.total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
