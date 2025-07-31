"use client";

import { useState } from "react";
import { useAuth } from "@/src/app/lib/AuthContext";

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

      const response = await fetch("/api/usuarios");
      const usuarios = await response.json();

      if (isRegister) {
        const existente = usuarios.find((u: any) => u.nome === username);
        if (existente) {
          setError("Usuário já cadastrado.");
          return;
        }

        const res = await fetch("/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: username,
            senha: password,
          }),
        });

        const novoUsuario = await res.json();
        login(novoUsuario);
        onClose();

      } else {
        const user = usuarios.find(
          (u: any) => u.nome === username && u.senha === password
        );

        if (!user) {
          setError("Usuário ou senha inválidos.");
          return;
        }

        login(user);
        onClose();
      }
    } catch (err: any) {
      setError("Erro inesperado: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-base sm:text-lg font-bold mb-4 text-center">
          {isRegister ? "Criar Conta" : "Entrar"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          {isRegister ? "Cadastrar" : "Entrar"}
        </button>

        <p
          className="text-sm mt-4 text-center cursor-pointer text-blue-600 hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Já tem conta? Entrar" : "Não tem conta? Cadastre-se"}
        </p>

        <button
          onClick={onClose}
          className="mt-4 text-gray-600 text-sm underline block mx-auto"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
