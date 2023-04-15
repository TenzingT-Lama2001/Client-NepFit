import { EventInput } from "@fullcalendar/core";
import { createContext, ReactNode, useState } from "react";
import { Product } from "../sections/auth/dashboard/product/ProductNewEditForm";
import { Products } from "../pages/dashboard/admin/products/list";
import { CartItem } from "../sections/auth/dashboard/product/ProductDetailsSummary";

export type Roles = "admin" | "member" | "trainer" | "staff";

type SetValue = (value: any) => void;
type AuthContextType = {
  auth: {
    id: string;
    name: string;
    email: string;
    role: Roles;
    accessToken: string;
    status: string;
    address: string;
    avatarUrl: {
      id: string;
      secure_url: string;
    };
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
  calendarState: {
    isLoading: boolean;
    error: Error | string | null;
    events: any[];
    isOpenModal: boolean;
    selectedEventId: null | string;
    selectedRange: null | { start: Date; end: Date };
  };
  setCalendarState: SetValue;
  membership: {
    membershipId?: string;
    programId?: string;
    packageId?: string;
    trainerId?: string;
  } | null;
  setMembership: SetValue;
  productState: {
    product: Products[];
    checkout: {
      activeStep: number;
      cart: CartItem[];
      subtotal: number;
      total: number;
      discount: number;
      shipping: number;
      billing: null;
    };
  } | null;
  setProductState: SetValue;
};

const AuthContext = createContext<AuthContextType | null>(null);
type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [membership, setMembership] = useState(null);
  const [productState, setProductState] = useState({
    product: [],
    checkout: {
      activeStep: 0,
      cart: [],
      subtotal: 0,
      total: 0,
      discount: 0,
      shipping: 0,
      billing: null,
    },
  });
  const [calendarState, setCalendarState] = useState({
    isLoading: false,
    error: null,
    events: [],
    isOpenModal: false,
    selectedEventId: null,
    selectedRange: null,
  });
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
        calendarState,
        setCalendarState,
        membership,
        setMembership,
        productState,
        setProductState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
