export interface CustomerOrderEntry {
  id: string;
  customerName: string;
  product: string;
  price: string;
  orderDate: string;
  status: "Paid" | "Pending" | "Failed";
  selected: boolean;
}