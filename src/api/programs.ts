import axios from "../utils/axios";
export const getPrograms = async () => {
  const { data } = await axios.get(`/api/programs`);

  return data.data;
};
