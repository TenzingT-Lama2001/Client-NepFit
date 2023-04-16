import axios from "../utils/axios";
export const getPrograms = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/programs`, {
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

export const deleteProgram = async (id: string) => {
  const { data } = await axios.delete(`/api/programs/${id}`);
  return data;
};

export const updateProgram = async (id: string, program: any) => {
  const { data } = await axios.patch(`/api/programs/${id}`, program);
  return data;
};

export const createProgram = async (program: any) => {
  const { data } = await axios.post(`/api/programs`, program);
  return data;
};

export const getOneProgram = async (id: string) => {
  const { data } = await axios.get(`/api/programs/${id}`);
  return data.data;
};
