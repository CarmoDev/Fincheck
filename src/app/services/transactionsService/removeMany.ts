import { httpClient } from "../httpClient";

export async function removeMany(parcelId: string) {
  const { data } = await httpClient.delete(`/transactions/parcels/${parcelId}`);

  return data;
}
