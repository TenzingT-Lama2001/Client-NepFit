import { createContext, ReactNode, useState } from "react";

export type Roles = "admin" | "member" | "trainer" | "staff";

type SetValue = (value: any) => void;
type AuthContextType = {
  auth: {
    id: string;
    name: string;
    email: string;
    role: Roles;
    accessToken: string;
  } | null;
  setAuth: SetValue;
  currentPlan: {
    currentProgramId: string | null;
    currentPackageId: string | null;
    currentProgram: string | null;
    currentPackage: string | null;
    currentTrainerId: string | null;
  } | null;
  setCurrentPlan: SetValue;
  stripeDetails: {
    stripeCustomerId: string | null;
    stripeProductId: string | null;
    stripePackageId: string | null;
    stripePackagePriceId: string | null;
    stripeProductPriceId: string | null;
    subscriptionId: string | null;
    clientSecret: string | null;
    planId: string | null;
  } | null;
  setStripeDetails: SetValue;
};

const AuthContext = createContext<AuthContextType | null>(null);
type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [stripeDetails, setStripeDetails] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        currentPlan,
        setCurrentPlan,
        stripeDetails,
        setStripeDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
