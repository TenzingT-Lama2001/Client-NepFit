import axios from "../utils/axios";

export const getMembers = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/admin/members`, {
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
export const getMember = async (id: string) => {
  const { data } = await axios.get(`/api/admin/members/${id}`);
  return data.data;
};
export const updateMember = async (id: string, member: any) => {
  const { data } = await axios.patch(`/api/admin/members/${id}`, member);
  return data;
};
export const deleteMember = async (id: string) => {
  const { data } = await axios.delete(`/api/admin/members/${id}`);
  return data;
};
export const createMember = async (member: any) => {
  const { data } = await axios.post(`/api/admin/members`, member);
  return data;
};
