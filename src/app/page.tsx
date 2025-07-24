"use client"
import { useRef, useState } from "react";
import { books } from "../app/lib/livros"
import Carousel from "../components/Carousel";

export default function Home() {
  const carouselData = useRef(books);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
      <div className="bg-green-50 ">
        <section className="grid place-items-center h-screen">
          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-[64px]">Sua biblioteca</h1>
            <p className="text-green-400 text-[64px]">digital e moderna</p>
            <p className="text-gray-500 text-[32px]">Gerencie, explore e descubra conhecimento de forma simples e elegante.</p>
            <p className="text-gray-500 text-[32px]">Uma experiência premium para bibliotecas modernas.</p>
          </div>
        </section>

        <section className="h-screen grid place-items-center">
          <h1 className="text-[64px]">Catálogo</h1>
          <Carousel
            activeItemIndex={activeItemIndex}
            setActiveItemIndex={setActiveItemIndex}
            carouselData={carouselData.current}
          />
        </section>
      </div>



  );
};
