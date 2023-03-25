import axios from "../utils/axios";

export const getTrainers = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/admin/trainers`, {
    params: {
      pageNumber: page,
      pageSize: limit,
      searchQuery,
      sortBy,
      order,
    },
  });

  return data.data;
};
export const getTrainer = async (id: string) => {
  const { data } = await axios.get(`/api/admin/trainers/${id}`);
  return data.data;
};
export const updateTrainer = async (id: string, trainer: any) => {
  const { data } = await axios.patch(`/api/admin/trainers/${id}`, trainer);
  return data;
};
export const deleteTrainer = async (id: string) => {
  const { data } = await axios.delete(`/api/admin/trainers/${id}`);
  return data;
};
export const createTrainer = async (trainer: any) => {
  const { data } = await axios.post(`/api/admin/trainers`, trainer);
  return data;
};
