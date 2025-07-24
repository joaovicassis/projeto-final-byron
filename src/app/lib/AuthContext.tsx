'use client';

import { createContext, useContext, useState, ReactNode } from "react";
//define o formato do contexto
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

//cria o contexto com valor inicial nulo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // coloque false ou true para simular logado e deslogado

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
};
