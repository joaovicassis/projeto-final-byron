"use client"
import { useRef, useState } from "react";
import { books } from "../app/lib/livros"
import Carousel from "../components/Carousel";
import Link from "next/link";

export default function Home() {
  const carouselData = useRef(books);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <div className="flex-grow bg-green-50">
      <section className="grid place-items-center h-screen">
        <div className="flex flex-col items-center text-center px-4">
          <h1 className="text-[64px]">Sua biblioteca</h1>
          <p className="text-green-400 text-[64px]">digital e moderna</p>
          <p className="text-gray-500 text-[32px]">Gerencie, explore e descubra conhecimento de forma simples e elegante.</p>
          <p className="text-gray-500 text-[32px]">Uma experiência premium para bibliotecas modernas.</p>
        </div>
      </section>

      <section className="w-full grid place-items-center overflow-hidden gap-6">
        <h1 className="text-[64px]">Catálogo</h1>
        <Carousel
          activeItemIndex={activeItemIndex}
          setActiveItemIndex={setActiveItemIndex}
          carouselData={carouselData.current}
        />
        <div className="container mt-8 mb-16 w-full flex justify-center">
          <button
            onClick={() => console.log("Adicionar livro")}
            className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-700 transition duration-200"
          >
            + Adicionar Livro
          </button>
        </div>
      </section>
    </div>
  );
};
