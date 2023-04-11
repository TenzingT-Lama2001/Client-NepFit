import axios from "../utils/axios";
export const getOneMembership = async (id: string) => {
  const { data } = await axios.get(`/api/membership/${id}`);
  return data.data;
};
export const getMembership = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/membership`, {
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
