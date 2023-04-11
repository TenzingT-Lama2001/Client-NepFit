import axios from "axios";

export const sendNotification = async (email: string) => {
  const { data } = await axios.post(`/api/notification`, email);
  return data;
};
