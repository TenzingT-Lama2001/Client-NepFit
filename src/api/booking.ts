import axios from "../utils/axios";
export const getBookings = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/booking`, {
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

export const deleteBooking = async (id: string) => {
  const { data } = await axios.delete(`/api/booking/${id}`);
  return data;
};
export const updateBooking = async (order: any) => {
  const { data } = await axios.patch(`/api/booking`, order);
  return data;
};
export const createBooking = async (booking: any) => {
  const { data } = await axios.post(`/api/booking`, booking);
  return data;
};

export const getOneBooking = async (id: string) => {
  const { data } = await axios.get(`/api/booking/${id}`);
  return data.data;
};

export const getApprovedBooking = async (id: any) => {
  console.log({ id });
  const { data } = await axios.get(`/api/booking/approved`, {
    params: {
      id,
    },
  });
  return data.data;
};
