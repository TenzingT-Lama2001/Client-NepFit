import axios from "../utils/axios";
export const getOneMembership = async (id: string) => {
  const { data } = await axios.get(`/api/membership/${id}`);
  return data.data;
};
