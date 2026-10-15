import api from "../../../lib/axios";

export async function getBrands() {
  const { data } = await api.get("/api/brands");

  return data;
}
///dsgvsv