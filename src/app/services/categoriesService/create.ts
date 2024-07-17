import { httpClient } from "../httpClient";

export interface CreateCategoriesParams {
  name: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
}

export async function create(params: CreateCategoriesParams) {
  const { data } = await httpClient.post("/categories", params);

  return data;
}
