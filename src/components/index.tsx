import Link from "next/link";
import Image from "next/image";

export default function Header(){
    return(
        <header>
            <div>
                <Link href="/"> 
                <Image src="Logo.svg" alt="Logo Bibliotech "width={40} height={40}/>
                </Link>
                <h1>Bibliotech</h1>
            </div>
            <nav>
                <Link href="/">Edição</Link>
                <Link href="/livros">Livros</Link>
                <Link href="/">Escritores</Link>
                <Link href="/">Usuário</Link>
            </nav>
        </header>
    )
}