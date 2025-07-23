import { useEffect } from "react";
const Carousel = ({ activeItemIndex, setActiveItemIndex, carouselData }) => {
    const getCircularIndex = (index, arrayLength) => {
        if (index < 0) {
            return arrayLength + (index % arrayLength)
        }

        return index % arrayLength
    }

    const forward = () => {
        // passa pra proxima imagem
        // se o itemAtivo diferente do tamnaho total - 1
        // 2 !== 3 - 1
        if(activeItemIndex !== carouselData.length - 1) {
            setActiveItemIndex((prevIndex) => prevIndex + 1);
        }

        if(activeItemIndex === carouselData.length - 1) {
            setActiveItemIndex(0);
        }
    }

    // passa pra imagem anterior
    // se o item ativo for diferente de 0
    // 0 !== 0
    const back = () => {
        if(activeItemIndex !== 0) {
            setActiveItemIndex((prevIndex) => prevIndex - 1);
        }

        if(activeItemIndex == 0) {
            setActiveItemIndex(carouselData.length - 1);
        }
    }

    useEffect(() => {        
        const timeoutId = setTimeout(() => {
            // o itemAtivo (0) === tamanho total - 1
            // o itemAtivo (1) === tamanho total - 1 (3 - 1 =2 )
            // o itemAtivo (2) === 2
            if(activeItemIndex === carouselData.length - 1) { {/* */}
                setActiveItemIndex(0);
            } else {
                forward();
            }
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [activeItemIndex]);

    return (
        <div className="flex items-center gap-50">
            <button
                onClick={back}
                className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-white bg-black bg-opacity-20 hover:bg-opacity-60 duration-200"
            >
                {"<"}
            </button>
            
            

            <div
                className="min-w-[300px] grid place-items-center rounded-lg h-[200px] duration-500 bg-white"
            >
                <p>{carouselData[getCircularIndex(activeItemIndex, carouselData.length)].title}</p>
                <img src={carouselData[getCircularIndex(activeItemIndex, carouselData.length)].coverImage} width={200} />
            </div>
            <div
                className="min-w-[300px] grid place-items-center rounded-lg h-[200px] duration-500 bg-white"
            >
                <p>{carouselData[getCircularIndex(activeItemIndex + 1, carouselData.length)].title}</p> 
                <img src={carouselData[getCircularIndex(activeItemIndex + 1, carouselData.length)].coverImage} width={200} />
            </div>
            <div
                className="min-w-[300px] grid place-items-center rounded-lg h-[200px] duration-500 bg-white"
            >
                <p>{carouselData[getCircularIndex(activeItemIndex + 2, carouselData.length)].title}</p>
                <img src={carouselData[getCircularIndex(activeItemIndex + 2, carouselData.length)].coverImage} width={200} />
            </div>

            <button
                onClick={forward}
                className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-white bg-black bg-opacity-20 hover:bg-opacity-60 duration-200"
            >
                {">"}
            </button>
        </div>
    );
};
export default Carousel;