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
};

const AuthContext = createContext<AuthContextType | null>(null);
type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
