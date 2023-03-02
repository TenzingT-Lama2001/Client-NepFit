import axios from "../utils/axios";
import useAuth from "./useAuth";

type SetValue = (value: any) => void;
export const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/member/auth/refresh");

    console.log("response data role", response.data.role);
    console.log("response data accessToken", response.data.accessToken);
    setAuth((prev: any) => ({
      ...prev,
      role: response.data.role,
      accessToken: response.data.accessToken,
    }));

    return response.data.accessToken;
  };
  console.log("USE REFRESH TOKEN SET AUTH", auth);

  return refresh;
};

export default useRefreshToken;
