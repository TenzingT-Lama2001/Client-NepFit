import axios from "../utils/axios";

export const getStaffs = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/admin/staffs`, {
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

export const updateStaff = async (id: string, staff: any) => {
  const { data } = await axios.patch(`/api/admin/staffs/${id}`, staff);
  return data;
};
export const deleteStaff = async (id: string) => {
  const { data } = await axios.delete(`/api/admin/staffs/${id}`);
  return data;
};
export const createStaff = async (staff: any) => {
  const { data } = await axios.post(`/api/admin/staffs`, staff);
  return data;
};
export const getStaff = async (id: string) => {
  const { data } = await axios.get(`/api/admin/staffs/${id}`);
  return data.data;
};
