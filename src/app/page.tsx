"use client"
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { useAuth } from "./lib/AuthContext";

// Importando do nosso novo serviço!
import { getLivros, deletarLivro, type Book } from "./lib/livrosService";

export default function Home() {
  // O estado 'books' agora vai guardar os livros vindos do serviço
  const [books, setBooks] = useState<Book[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { isLoggedIn } = useAuth();

  // useEffect para buscar os livros quando o componente montar
  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getLivros();
      setBooks(data);
    };
    fetchBooks();
  }, []); // O array vazio [] faz com que isso rode apenas uma vez

  // A função que realmente lida com a exclusão
  const handleDeletarLivro = async (id: string) => {
    const livroParaDeletar = books.find(b => b.id === id);
    if (!livroParaDeletar) return;

    // Mostra a mensagem de confirmação
    const confirmado = window.confirm(`Tem certeza que deseja excluir o livro "${livroParaDeletar.title}"?`);

    if (confirmado) {
      try {
        // Chama a função do nosso serviço para deletar do arquivo
        await deletarLivro(id);
        // Atualiza o estado local para remover o livro da tela instantaneamente
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

      <section className="w-full grid place-items-center overflow-hidden gap-8 py-16">
        <h1 className="text-5xl md:text-6xl">Catálogo</h1>
        <Carousel
          activeItemIndex={activeItemIndex}
          setActiveItemIndex={setActiveItemIndex}
          carouselData={books} // Usa o estado 'books' agora
          onDelete={handleDeletarLivro} // Passa a função de deletar como prop
        />
        
        <div className="container mt-8 mb-10 w-full flex justify-center">
          {isLoggedIn && (
            <button
              onClick={() => console.log("Lógica para adicionar livro virá aqui")}
              className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-700 transition duration-200"
            >
              + Adicionar Livro
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
