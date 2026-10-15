import api from "../../../lib/axios";

export async function getCar(id: string) {
  const { data } = await api.get("/api/cars/" + id);

  return data;
}
