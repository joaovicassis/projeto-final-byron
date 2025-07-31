"use client"
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Link from "next/link";
import { useAuth } from "./lib/AuthContext";
import BookFormModal from "../components/BookAddModal";
import { getLivros, deletarLivro, type Book } from "./lib/livrosService";

const BOOKS_PER_PAGE = 6; // 2 linhas x 3 colunas

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoggedIn } = useAuth();
  const [isBookAddModalOpen, setIsBookModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getLivros();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const booksOnCurrentPage = books.slice(startIndex, endIndex);

  const handleDeletarLivro = async (id: string) => {
    const livroParaDeletar = books.find(b => b.id === id);
    if (!livroParaDeletar) return;

    const confirmado = window.confirm(`Tem certeza que deseja excluir o livro "${livroParaDeletar.title}"?`);

    if (confirmado) {
      try {
        await deletarLivro(id);
        setBooks(currentBooks => currentBooks.filter(b => b.id !== id));
      } catch (error) {
        console.error("Falha ao deletar o livro:", error);
        alert("Ocorreu um erro ao deletar o livro.");
      }
    }
  };

  return (
    <div className="flex-grow bg-green-50">
      <section className="grid place-items-center h-screen">
        <div className="flex flex-col items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl">Sua biblioteca</h1>
          <p className="text-green-400 text-5xl md:text-6xl">digital e moderna</p>
          <p className="text-gray-500 text-xl md:text-2xl mt-4">Gerencie, explore e descubra conhecimento de forma simples e elegante.</p>
        </div>
      </section>

      <section className="w-full flex flex-col items-center overflow-hidden gap-8 py-16">
        <h1 className="text-5xl md:text-6xl">Catálogo</h1>
        <Carousel
          booksOnPage={booksOnCurrentPage}
          onDelete={handleDeletarLivro}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        
        <div className="container mt-8 mb-10 w-full flex justify-center">
          {isLoggedIn && (
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-700 transition duration-200"
            >
              + Adicionar Livro
            </button>
          )}
        </div>
      </section>

      <BookFormModal isOpen={isBookAddModalOpen} onClose={() => setIsBookModalOpen(false)} />
    </div>
  );
}
