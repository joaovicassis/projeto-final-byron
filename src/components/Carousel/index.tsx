import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/src/app/lib/AuthContext";

// Adicionamos 'id' ao tipo e a prop 'onDelete'
type CarouselItem = {
    id: string; // ID é necessário para a exclusão
    coverImage: string;
    title: string;
    author: string;
    releaseDate: string;
};

type CarouselProps = {
    activeItemIndex: number;
    setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
    carouselData: CarouselItem[];
    onDelete: (id: string) => void; // A prop que funciona como "fio elétrico"
};

// Adicionamos 'onDelete' às props do componente
const Carousel = ({ activeItemIndex, setActiveItemIndex, carouselData, onDelete }: CarouselProps) => {
    const { isLoggedIn } = useAuth();

    // Função para garantir que o índice seja sempre válido
    const getCircularIndex = (index: number) => {
        if (carouselData.length === 0) return 0;
        return (index % carouselData.length + carouselData.length) % carouselData.length;
    };

    const forward = () => {
        if (carouselData.length === 0) return;
        setActiveItemIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    };

    const back = () => {
        if (carouselData.length === 0) return;
        setActiveItemIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
    };

    // Lógica de auto-play (simplificada e corrigida)
    useEffect(() => {
        if (carouselData.length === 0) return;

        const timeoutId = setTimeout(forward, 5000);
        return () => clearTimeout(timeoutId);
    }, [activeItemIndex, carouselData.length]);

    // Se não houver livros, exibe uma mensagem
    if (carouselData.length === 0) {
      return <div className="h-[350px] flex items-center justify-center text-gray-500">Nenhum livro no catálogo.</div>
    }

    return (
        <div className="flex items-center gap-3">
            <button onClick={back} className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-black bg-white hover:bg-green-400 bg-opacity-20 hover:bg-opacity-60 duration-200">
                <ChevronLeft />
            </button>

            {/* Este é um exemplo de como o card principal ficaria.
                A estrutura original com múltiplos cards repetidos deve ser atualizada
                para seguir este padrão em cada botão de exclusão. */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                {/* Card do Item Ativo */}
                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex)].title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                            <h3 className="text-black text-xl font-semibold truncate">
                                {carouselData[getCircularIndex(activeItemIndex)].title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {carouselData[getCircularIndex(activeItemIndex)].author}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                {carouselData[getCircularIndex(activeItemIndex)].releaseDate}
                            </p>
                        </div>
                        {isLoggedIn && (
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={() => console.log("Editar livro")}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                    aria-label="Editar"
                                >
                                    <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                                </button>
                                <button
                                    // AÇÃO MODIFICADA: Chama a prop 'onDelete' com o ID correto
                                    onClick={() => onDelete(carouselData[getCircularIndex(activeItemIndex)].id)}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                    aria-label="Excluir"
                                >
                                    <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Você aplicaria a mesma lógica para os outros cards, se mantiver a estrutura repetida */}
                {/* Exemplo para o segundo card: */}
                {/* ... onClick={() => onDelete(carouselData[getCircularIndex(activeItemIndex + 1)].id)} ... */}

            </div>

            <button onClick={forward} className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-black bg-white hover:bg-green-400 hover:bg-opacity-60 duration-200">
                <ChevronRight />
            </button>
        </div>
    );
};

export default Carousel;