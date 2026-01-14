// Order type definitions - to be implemented in task 2
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  customer: CustomerData;
  items: OrderItem[];
  total: number;
  timestamp: string;
}
