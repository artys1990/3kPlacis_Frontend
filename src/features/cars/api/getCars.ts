import api from "../../../lib/axios";

export async function getCars(params) {
  const { data } = await api.get("/api/cars", {
    params,
  });
  return data;
}

export async function getFilterParams() {
  const { data } = await api.get("/api/cars/filter-options");
  return data;
}
