// app/lib/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Usuario } from "./usuariosService"; // <-- substitui User

type AuthContextType = {
  user: Usuario | null;
  isLoggedIn: boolean;
  login: (user: Usuario) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = (user: Usuario) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
