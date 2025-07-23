import Link from "next/link";
import Image from "next/image";
import { CircleUser } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="w-full px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="min-w-[40px] flex-shrink-0">{/*o flex-shrink expecifica o quanto o tamanho do item muda em relação ao restante dos itens no container*/}
              <Image src="/Logo.svg" alt="Logo Bibliotech" width={90} height={90} />
            </Link>
            <h1 className="text-[48px] text-black truncate">BiblioTech</h1>
          </div>
          <nav className="flex gap-8 text-gray-400 text-2xl items-center">
            <Link href="/" className="hover:text-green-400 transition-colors">Edição</Link>
            <Link href="/livros" className="hover:text-green-400 transition-colors">Livros</Link>
            <Link href="/" className="hover:text-green-400 transition-colors">Escritores</Link>
            <Link href="/" className="hover:text-green-400 transition-colors">Usuário</Link>
            <CircleUser className="w-15 h-15 text-gray-400 hover:text-green-400 transition-colors cursor-pointer" strokeWidth={1.5}/>
          </nav>
        </div>
      </div>
    </header>
  );
}
