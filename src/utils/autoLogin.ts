import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { PATH_DASHBOARD } from "../routes/path";

export const AutoLogin = async () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const { push } = useRouter();
  try {
    const response = await refresh();
    console.log("response", response);
    if (response && auth?.role) {
      console.log("auth!!!!!!!!!!!!!!!!!!!!!", auth);
      push(`${PATH_DASHBOARD.dashboard[auth.role].root}`);
    }
  } catch (err) {
    console.log("catch err", err);
  }
};
