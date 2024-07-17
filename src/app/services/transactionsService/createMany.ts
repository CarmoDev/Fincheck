import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
  qtyParcel: number;
  parcelId: string;
}

export async function createMany(params: Array<CreateTransactionParams>) {
  const { data } = await httpClient.post("/transactions/create-many", params);

  return data;
}
