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
    <header className="fixed top-0 w-full z-50 bg-white py-4 shadow-md px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo e título */}
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="min-w-[40px] flex-shrink-0">
            <Image src="/Logo.svg" alt="Logo Bibliotech" width={70} height={70} />
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-black truncate">
            BiblioTech
          </h1>
        </div>

        {/* Navegação */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-gray-400 text-lg sm:text-xl md:text-2xl items-center">
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
                  className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 hover:text-green-400 transition-colors cursor-pointer"
                  strokeWidth={1.5}
                />
              </button>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-green-400 transition-colors"
            >
              Registrar / Logar
            </button>
          )}
        </nav>

        {/* Modais */}
        <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </header>
  );
}
