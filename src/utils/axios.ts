import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) =>
    Promise.reject(
      error.response &&
        error.response.data &&
        error.response.data.message &&
        error
    ) || "Something went wrong"
);

export default axiosInstance;
