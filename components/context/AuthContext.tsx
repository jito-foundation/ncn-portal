"use client";
import { createContext, useContext, useState } from "react";

export type AuthContext = Readonly<{
  isAuthenticated: boolean;
  login?(): void;
  logout?(): void;
}>;

export const DEFAULT_AUTH_CONFIG = Object.freeze({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContext>(DEFAULT_AUTH_CONFIG);

export const useAuth = () => useContext(AuthContext);
