"use client";

import { useState } from "react";
import { useAuth } from "@/src/app/lib/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EditUserModal({ isOpen, onClose }: Props) {
  const { user, login, logout } = useAuth();
  const [nome, setNome] = useState(user?.nome ?? "");
  const [senha, setSenha] = useState(user?.senha ?? "");
  const router = useRouter();

  if (!isOpen) return null;

  const handleUpdate = async () => {
    const body = JSON.stringify({ nome, senha });

    console.log("Dados enviados para o backend:", body);

    const res = await fetch(`/api/usuarios/${user?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const updatedUser = await res.json();
    login(updatedUser); // atualiza o contexto com os dados novos
    onClose();
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Tem certeza que deseja excluir sua conta?");

    if (!confirmDelete || !user?.id) return;

    await fetch(`/api/usuarios/${user.id}`, {
      method: "DELETE",
    });

    logout(); // limpa o contexto
    onClose();
    router.push("/"); // opcional: volta pra página inicial
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          type="password"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Salvar
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="mt-6 w-full text-center text-sm text-red-600 underline hover:text-red-800"
        >
          Excluir Conta
        </button>
      </div>
    </div>
  );
}
