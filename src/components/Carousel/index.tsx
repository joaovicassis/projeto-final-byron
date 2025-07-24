import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

// tipagem das props esperadas
type CarouselItem = {
    coverImage: string;
    title: string;
    author: string;
    releaseDate: string
};

type CarouselProps = {
    activeItemIndex: number;
    setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
    carouselData: CarouselItem[];
};

const Carousel = ({ activeItemIndex, setActiveItemIndex, carouselData }: CarouselProps) => {
    const getCircularIndex = (index: number, arrayLength: number) => {
        if (index < 0) {
            return arrayLength + (index % arrayLength)
        }

        return index % arrayLength
    }

    const forward = () => {
        // passa pra proxima imagem
        // se o itemAtivo diferente do tamnaho total - 1
        // 2 !== 3 - 1
        if (activeItemIndex !== carouselData.length - 1) {
            setActiveItemIndex((prevIndex: number) => prevIndex + 1);
        }

        if (activeItemIndex === carouselData.length - 1) {
            setActiveItemIndex(0);
        }
    }

    // passa pra imagem anterior
    // se o item ativo for diferente de 0
    // 0 !== 0
    const back = () => {
        if (activeItemIndex !== 0) {
            setActiveItemIndex((prevIndex: number) => prevIndex - 1);
        }

        if (activeItemIndex == 0) {
            setActiveItemIndex(carouselData.length - 1);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // o itemAtivo (0) === tamanho total - 1
            // o itemAtivo (1) === tamanho total - 1 (3 - 1 =2 )
            // o itemAtivo (2) === 2
            if (activeItemIndex === carouselData.length - 1) {
                {/* */ }
                setActiveItemIndex(0);
            } else {
                forward();
            }
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [activeItemIndex]);

    return (
        <div className="flex items-center gap-3">

            <button onClick={back} className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-black bg-white hover:bg-green-400 bg-opacity-20 hover:bg-opacity-60 duration-200">
                <ChevronLeft />
            </button>

            <div className="grid grid-cols-3 gap-20">

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex, carouselData.length)].releaseDate}
                        </p>
                        <div className="flex container justify-between gap-3 pr-2 w-full  p-0">
                                <button
                                    onClick={() =>
                                        console.log("Editar livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Editar"
                                >
                                    <Pencil className="w-8 h-6 text-gray-500 hover:text-blue-600 transition" />
                                </button>

                                <button
                                    onClick={() =>
                                        console.log("Excluir livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Excluir"
                                >
                                    <Trash2 className="w-8 h-6 text-gray-500 hover:text-red-600 transition" />
                                </button>
                            </div>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex + 1, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex + 1, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex + 1, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 1, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 1, carouselData.length)].releaseDate}
                        </p>
                        <div className="flex container justify-between gap-3 pr-2 w-full  p-0">
                                <button
                                    onClick={() =>
                                        console.log("Editar livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Editar"
                                >
                                    <Pencil className="w-8 h-6 text-gray-500 hover:text-blue-600 transition" />
                                </button>

                                <button
                                    onClick={() =>
                                        console.log("Excluir livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Excluir"
                                >
                                    <Trash2 className="w-8 h-6 text-gray-500 hover:text-red-600 transition" />
                                </button>
                            </div>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex + 2, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex + 2, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex + 2, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 2, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 2, carouselData.length)].releaseDate}
                        </p>
                        <div className="flex container justify-between gap-3 pr-2 w-full  p-0">
                                <button
                                    onClick={() =>
                                        console.log("Editar livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Editar"
                                >
                                    <Pencil className="w-8 h-6 text-gray-500 hover:text-blue-600 transition" />
                                </button>

                                <button
                                    onClick={() =>
                                        console.log("Excluir livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Excluir"
                                >
                                    <Trash2 className="w-8 h-6 text-gray-500 hover:text-red-600 transition" />
                                </button>
                            </div>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex + 3, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex + 3, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex + 3, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 3, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 3, carouselData.length)].releaseDate}
                        </p>
                        <div className="flex container justify-between gap-3 pr-2 w-full  p-0">
                                <button
                                    onClick={() =>
                                        console.log("Editar livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Editar"
                                >
                                    <Pencil className="w-8 h-6 text-gray-500 hover:text-blue-600 transition" />
                                </button>

                                <button
                                    onClick={() =>
                                        console.log("Excluir livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Excluir"
                                >
                                    <Trash2 className="w-8 h-6 text-gray-500 hover:text-red-600 transition" />
                                </button>
                            </div>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex + 4, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex + 4, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex + 4, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 4, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 4, carouselData.length)].releaseDate}
                        </p>
                        <div className="flex container justify-between gap-3 pr-2 w-full  p-0">
                                <button
                                    onClick={() =>
                                        console.log("Editar livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Editar"
                                >
                                    <Pencil className="w-8 h-6 text-gray-500 hover:text-blue-600 transition" />
                                </button>

                                <button
                                    onClick={() =>
                                        console.log("Excluir livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Excluir"
                                >
                                    <Trash2 className="w-8 h-6 text-gray-500 hover:text-red-600 transition" />
                                </button>
                            </div>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-88 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex + 5, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex + 5, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex + 5, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 5, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex + 5, carouselData.length)].releaseDate}
                        </p>
                        <div className="flex container justify-between gap-3 pr-2 w-full  p-0">
                                <button
                                    onClick={() =>
                                        console.log("Editar livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Editar"
                                >
                                    <Pencil className="w-8 h-6 text-gray-500 hover:text-blue-600 transition" />
                                </button>

                                <button
                                    onClick={() =>
                                        console.log("Excluir livro:", carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title)
                                    }
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Excluir"
                                >
                                    <Trash2 className="w-8 h-6 text-gray-500 hover:text-red-600 transition" />
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <button
                onClick={forward} className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-black bg-white hover:bg-green-400 hover:bg-opacity-60 duration-200">
                <ChevronRight />
            </button>
        </div>
    );
};

export default Carousel;
