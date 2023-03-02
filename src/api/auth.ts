import axios from "../utils/axios";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post(`/api/member/auth/login`, {
    email,
    password,
  });
  console.log("data", data);
  return data;
};

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { data } = await axios.post(`/api/member/auth/register`, {
    firstName,
    lastName,
    email,
    password,
  });

  console.log("data", data);

  return data;
};

export const logout = async () => {
  const { data } = await axios.post(`/api/member/auth/logout`);

  return data;
};
