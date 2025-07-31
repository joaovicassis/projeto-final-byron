// components/AuthModal.tsx
"use client";

import { useState } from "react";
import { criarConta, fazerLogin } from "../lib/authService";
import { useAuth } from "../lib/AuthContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setError(null);
      if (isRegister) {
        const user = await criarConta(username, password);
        login(user);
        onClose();
      } else {
        const user = await fazerLogin(username, password);
        login(user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold mb-4">{isRegister ? "Criar Conta" : "Entrar"}</h2>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {isRegister ? "Cadastrar" : "Entrar"}
        </button>

        <p className="text-sm mt-4 text-center cursor-pointer text-blue-600"
           onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Já tem conta? Entrar" : "Não tem conta? Cadastre-se"}
        </p>

        <button onClick={onClose} className="mt-4 text-gray-600 text-sm underline block mx-auto">
          Cancelar
        </button>
      </div>
    </div>
  );
}
