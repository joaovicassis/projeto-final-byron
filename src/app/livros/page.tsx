import BookCard from "@/src/components/BookCard";
import { books } from "@/src/app/lib/livros";

export default function LivrosPage(){
    return(
        <main className="flex-grow py-8 bg-green-50">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Acervo</h1>
                <div className="grid grid-cols-3 gap-8 mt-8">
                    {books.map((books)=> (
                        <BookCard key={books.id} book={books}/>
                    ))}
                </div>
            </div>
        </main>
    )
}