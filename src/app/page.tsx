"use client"
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Link from "next/link";
import { useAuth } from "./lib/AuthContext";

import { getLivros, deletarLivro, editarLivro, type Book, type BookFormData } from "./lib/livrosService";

const BOOKS_PER_PAGE = 6;

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoggedIn } = useAuth();
  
  // --- Estados para o Modal de Edição ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<BookFormData | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getLivros();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const booksOnCurrentPage = books.slice(currentPage * BOOKS_PER_PAGE, (currentPage * BOOKS_PER_PAGE) + BOOKS_PER_PAGE);

  // --- Lógica do CRUD ---
  const handleDeletarLivro = async (id: string) => {
    const livro = books.find(b => b.id === id);
    if (livro && window.confirm(`Tem certeza que deseja excluir "${livro.title}"?`)) {
      await deletarLivro(id);
      setBooks(current => current.filter(b => b.id !== id));
    }
  };

  const handleEditarClick = (book: Book) => {
    setEditingBook(book);
    setFormData({ // Preenche o formulário com os dados do livro
      title: book.title,
      author: book.author,
      genre: book.genre,
      releaseDate: book.releaseDate,
      synopsis: book.synopsis,
      coverImage: book.coverImage,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    if (!formData || !editingBook) return;
    
    try {
      await editarLivro(editingBook.id, formData);
      setBooks(currentBooks => 
        currentBooks.map(b => b.id === editingBook.id ? { ...b, ...formData } : b)
      );
      setIsModalOpen(false);
      setEditingBook(null);
    } catch (error) {
      alert("Falha ao salvar as alterações.");
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
          onEdit={handleEditarClick} // <-- Passando a nova função
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <div className="container mt-8 mb-10 w-full flex justify-center">{/* ... botão de adicionar ... */}</div>
      </section>

      {/* --- Modal de Edição --- */}
      {isModalOpen && editingBook && formData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Editar Livro</h2>
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleFormChange} placeholder="Título" className="w-full p-2 border rounded"/>
              <input type="text" name="author" value={formData.author} onChange={handleFormChange} placeholder="Autor" className="w-full p-2 border rounded"/>
              <input type="text" name="genre" value={formData.genre} onChange={handleFormChange} placeholder="Gênero" className="w-full p-2 border rounded"/>
              <textarea name="synopsis" value={formData.synopsis} onChange={handleFormChange} placeholder="Sinopse" className="w-full p-2 border rounded h-24"/>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
              <button onClick={handleSaveChanges} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
