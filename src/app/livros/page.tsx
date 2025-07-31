import BookCard from "@/src/components/BookCard";
import { books } from "@/src/app/lib/livros";

export default function LivrosPage() {
  return (
    <main className="flex-grow py-8 bg-green-50 pt-36">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Acervo</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </main>
  );
}
