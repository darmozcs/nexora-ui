import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { User } from "@/models";
import { useAuthProvider } from "../hooks/useAuthProvider";

interface AuthContextValue {
  user: User;
}

const DEFAULT_USER: User = { id: "1", name: "Admin", email: "admin@nexora.com", role: "ADMIN" };

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthProvider();

  return (
    <AuthContext.Provider value={{ user: user ?? DEFAULT_USER }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
