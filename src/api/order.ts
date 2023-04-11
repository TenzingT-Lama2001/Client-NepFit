import axios from "../utils/axios";
export const getOrders = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/order`, {
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

export const deleteOrder = async (id: string) => {
  const { data } = await axios.delete(`/api/order/${id}`);
  return data;
};

export const updateOrder = async (id: string, order: any) => {
  const { data } = await axios.patch(`/api/order/${id}`, order);
  return data;
};

export const createOrder = async (order: any) => {
  const { data } = await axios.post(`/api/order`, order);
  return data;
};

export const getOneOrder = async (id: string) => {
  const { data } = await axios.get(`/api/order/${id}`);
  return data.data;
};

export const getOrderByStripeProductId = async (stripeProductId: string) => {
  const { data } = await axios.get(`/api/order/${stripeProductId}/order`);
  return data.data;
};

export const getPurchasingHistory = async (memberId: string) => {
  const { data } = await axios.get(`/api/order/${memberId}/purchasing-history`);
  return data.data;
};
