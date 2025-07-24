import { useEffect } from "react";
import Image from "next/image";

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
        <div className="flex gap-20 items-center">

            <button onClick={back} className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-white bg-black bg-opacity-20 hover:bg-opacity-60 duration-200">
                {"<"}
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
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex +1, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex+1, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex+1, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+1, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+1, carouselData.length)].releaseDate}
                        </p>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex +2, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex+2, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex+2, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+2, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+2, carouselData.length)].releaseDate}
                        </p>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex +3, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex+3, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex+3, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+3, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+3, carouselData.length)].releaseDate}
                        </p>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex +4, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex+4, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex+4, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+4, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+4, carouselData.length)].releaseDate}
                        </p>
                    </div>
                </div>

                <div className="w-[400px] h-[350px] bg-white rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative h-88 w-full">
                        <Image
                            src={carouselData[getCircularIndex(activeItemIndex +5, carouselData.length)].coverImage}
                            alt={carouselData[getCircularIndex(activeItemIndex+5, carouselData.length)].title}
                            fill
                            className="h-48 w-full"
                        />
                    </div>
                    <div className="h-1/2 w-full flex flex-col items-start justify-evenly px-2 text-center">
                        <h3 className="text-black text-xl text-left">
                            {carouselData[getCircularIndex(activeItemIndex+5, carouselData.length)].title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+5, carouselData.length)].author}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {carouselData[getCircularIndex(activeItemIndex+5, carouselData.length)].releaseDate}
                        </p>
                    </div>
                </div>
            </div>
            <button
                onClick={forward} className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-white bg-black bg-opacity-20 hover:bg-opacity-60 duration-200">
                {">"}
            </button>
        </div>
    );
};

export default Carousel;
