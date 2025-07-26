"use client";
import Link from "next/link";
import Image from "next/image";
import { CircleUser } from "lucide-react";
import { useAuth } from "@/src/app/lib/AuthContext";

export default function Header() {
  const { isLoggedIn, login } = useAuth();

  return (
    <header className="w-full bg-white py-4 mb-1 shadow-md">
      <div className="flex justify-between container mx-auto">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="min-w-[40px] flex-shrink-0">
              <Image src="/Logo.svg" alt="Logo Bibliotech" width={90} height={90} />
            </Link>
            <h1 className="text-[48px] text-black truncate">BiblioTech</h1>
          </div>

          <nav className="flex gap-8 text-gray-400 text-2xl items-center">
            <Link href="/" className="hover:text-green-400 transition-colors">Edição</Link>
            <Link href="/livros" className="hover:text-green-400 transition-colors">Livros</Link>
            <Link href="/" className="hover:text-green-400 transition-colors">Escritores</Link>
            {isLoggedIn ? (
              <>
                <Link href="/" className="hover:text-green-400 transition-colors">Usuário</Link>
                <CircleUser className="w-15 h-15 text-gray-400 hover:text-green-400 transition-colors cursor-pointer" strokeWidth={1.5} />
              </>
            ) : (
              <button
                onClick={ login }
                className="hover:text-green-400 transition-colors text-2xl"
              >
                Registrar
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
