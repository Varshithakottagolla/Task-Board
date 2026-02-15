import React, { createContext, useContext, useState, useCallback } from "react";
import { loadAuth, saveAuth } from "@/lib/storage";

interface AuthCtx {
  isAuthenticated: boolean;
  login: (remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadAuth());

  const login = useCallback((remember: boolean) => {
    setIsAuthenticated(true);
    if (remember) saveAuth(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    saveAuth(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
