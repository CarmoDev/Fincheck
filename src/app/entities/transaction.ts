export interface Transaction {
  id: string;
  name: string;
  categoryId: string;
  bankAccountId: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
  qtyParcel: number;
  parcelId: string;
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}
