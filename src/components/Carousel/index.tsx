import Image from "next/image";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/src/app/lib/AuthContext";

// Tipos foram simplificados. O Carousel agora recebe os livros da página atual.
type BookForCarousel = {
    id: string;
    coverImage: string;
    title: string;
    author: string;
    releaseDate: string;
};

type CarouselProps = {
    booksOnPage: BookForCarousel[];
    onDelete: (id: string) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
    currentPage: number;
    totalPages: number;
};

const Carousel = ({ booksOnPage, onDelete, onNextPage, onPrevPage, currentPage, totalPages }: CarouselProps) => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="flex items-center justify-center w-full max-w-6xl gap-4">
            {/* Botão Voltar */}
            <button 
                onClick={onPrevPage} 
                disabled={currentPage === 0}
                className="p-2 rounded-full bg-white/50 shadow-md hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* A Grade de Livros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {booksOnPage.length > 0 ? (
                    booksOnPage.map(book => (
                        <div key={book.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[380px] border border-green-100 hover:shadow-xl transition-shadow">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={book.coverImage}
                                    alt={`Capa do livro ${book.title}`}
                                    fill
                                    className="object-cover"
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Imagem+Indisponível'; }}
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 truncate" title={book.title}>
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{book.author}</p>
                                    <p className="text-gray-400 text-xs mt-1">{book.releaseDate}</p>
                                </div>
                                {isLoggedIn && (
                                    <div className="flex justify-end gap-2 pt-2 border-t mt-2">
                                        <button
                                            onClick={() => console.log("Editar:", book.id)}
                                            className="p-2 rounded-full hover:bg-gray-100"
                                            aria-label="Editar"
                                        >
                                            <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(book.id)}
                                            className="p-2 rounded-full hover:bg-gray-100"
                                            aria-label="Excluir"
                                        >
                                            <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 h-[380px] flex items-center justify-center text-gray-500">
                        Nenhum livro no catálogo.
                    </div>
                )}
            </div>

            {/* Botão Avançar */}
            <button 
                onClick={onNextPage} 
                disabled={currentPage >= totalPages - 1}
                className="p-2 rounded-full bg-white/50 shadow-md hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
        </div>
    );
};

export default Carousel;