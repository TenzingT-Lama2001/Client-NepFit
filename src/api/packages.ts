import axios from "../utils/axios";
export const getPackages = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/packages`, {
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

export const deletePackage = async (id: string) => {
  const { data } = await axios.delete(`/api/packages/${id}`);
  return data;
};

export const updatePackage = async (id: string, packages: any) => {
  const { data } = await axios.patch(`/api/packages/${id}`, packages);
  return data;
};

export const createPackage = async (packages: any) => {
  const { data } = await axios.post(`/api/packages`, packages);
  return data;
};

export const getOnePackage = async (id: string) => {
  const { data } = await axios.get(`/api/packages/${id}`);
  return data.data;
};
