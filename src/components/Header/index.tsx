"use client";

import EditUserModal from "@/src/components/EditUserModal/EditUserModal";
import AuthModal from "@/src/components/AuthModal/AuthModal";
import Link from "next/link";
import Image from "next/image";
import { CircleUser } from "lucide-react";
import { useAuth } from "@/src/app/lib/AuthContext";
import { useState } from "react";

// Agora a prop é opcional (com ?)
type HeaderProps = {
  onDestacarClick?: () => void;
};

export default function Header({ onDestacarClick }: HeaderProps) {
  const { isLoggedIn, login, logout } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white py-4 mb-1 shadow-md">
      <div className="flex justify-between container mx-auto">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="min-w-[40px] flex-shrink-0">
              <Image src="/Logo.svg" alt="Logo Bibliotech" width={90} height={90} />
            </Link>
            <h1 className="text-[48px] text-black truncate">BiblioTech</h1>
          </div>

          <nav className="flex gap-8 text-gray-400 text-2xl items-center">
            {/* Só renderiza o botão se a prop existir */}
            {onDestacarClick && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDestacarClick();
                }}
                className="hover:text-green-400 transition-colors"
              >
                Livros em destaque
              </button>
            )}

            <Link href="/livros" className="hover:text-green-400 transition-colors">
              Todos os Livros
            </Link>

            {isLoggedIn ? (
              <>
                <button onClick={() => setIsEditModalOpen(true)}>
                  <CircleUser
                    className="w-15 h-15 text-gray-400 hover:text-green-400 transition-colors cursor-pointer"
                    strokeWidth={1.5}
                  />
                </button>
                <button
                  onClick={logout}
                  className="text-2xl text-red-500 hover:text-red-600 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hover:text-green-400 transition-colors text-2xl"
              >
                Registrar / Logar
              </button>
            )}
          </nav>

          {/* Modais */}
          <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
      </div>
    </header>
  );
}
