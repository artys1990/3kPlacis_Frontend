import api from "../../../lib/axios";

export async function getModels(brandId: string) {
  const { data } = await api.get("/api/models/", {
    params: brandId,
  });

  return data;
}
