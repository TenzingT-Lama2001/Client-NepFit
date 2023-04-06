import axios from "../utils/axios";
export const getProducts = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/products`, {
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

export const deleteProduct = async (id: string) => {
  const { data } = await axios.delete(`/api/products/${id}`);
  return data;
};

export const updateProduct = async (id: string, products: any) => {
  const { data } = await axios.patch(`/api/products/${id}`, products);
  return data;
};

export const createProduct = async (products: any) => {
  const { data } = await axios.post(`/api/products`, products);
  return data;
};

export const getOneProduct = async (id: string) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data.data;
};
