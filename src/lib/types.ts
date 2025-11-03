export type Product = {
  id: string;
  name: string;
  lotNumber: string;
  quantity: number;
  expectedQuantity: number;
  expirationDate: string;
  historicalData: { date: string; quantity: number }[];
};

export type Order = {
  id: string;
  customerId: string;
  orderDate: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  totalAmount: number;
};

export type Shipment = {
  id:string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Delayed' | 'Delivered' | 'Pending';
  estimatedDelivery: string;
  shipmentData: string;
  expectedTransitTime: string;
  expectedTemperatureRange: string;
};
