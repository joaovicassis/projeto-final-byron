import Image from "next/image";
import Link from "next/link";

export default function BookCard() {
    return (
        <Link href="">
            <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="relative h-48 w-full">
                    <Image
                        src="/livros/senhorDosAneis.png"
                        alt="Foto da capa do livro"
                        fill
                    />
                </div>
                <div className="flex flex-col p-4 gap-2">
                    <h3 className="text-lg font-bold">Nome do livro</h3>
                    <p>Descrição do livro</p>
                </div>
            </div>
        </Link>
    )
}