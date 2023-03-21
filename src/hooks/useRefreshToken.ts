import axios from "../utils/axios";
import useAuth from "./useAuth";

type SetValue = (value: any) => void;
export const useRefreshToken = () => {
  const { auth, setAuth, setStripeDetails } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/common/auth/refresh");
    console.log("response", response);
    console.log("response data role", response.data.role);
    console.log("response data accessToken", response.data.accessToken);
    setAuth((prev: any) => ({
      ...prev,
      id: response.data._id,
      email: response.data.email,
      name: response.data.firstName,
      role: response.data.role,
      accessToken: response.data.accessToken,
    }));

    setStripeDetails((prev: any) => ({
      ...prev,
      stripeCustomerId: response.data.stripeCustomerId,
    }));

    return response.data.accessToken;
  };
  console.log("USE REFRESH TOKEN SET AUTH", auth);

  return refresh;
};

export default useRefreshToken;
