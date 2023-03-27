// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) throw new Error("Auth context must be use inside AuthProvider");

//   return context;
// };

// export default useAuth;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext)
    throw new Error("Auth context must be use inside AuthProvider");
  const {
    auth,
    setAuth,
    setCurrentPlan,
    currentPlan,
    stripeDetails,
    setStripeDetails,
    calendarState,
    setCalendarState,
  } = authContext;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (auth) {
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, [auth]);

  return {
    isAuthenticated,
    isInitialized,
    auth,
    setAuth,
    currentPlan,
    setCurrentPlan,
    stripeDetails,
    setStripeDetails,
    calendarState,
    setCalendarState,
  };
};

export default useAuth;
