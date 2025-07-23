"use client"
import { useRef, useState } from "react";
import { books } from "../app/lib/livros"
import Carousel from "../components/Carousel";

export default function Home() {
  const carouselData = useRef(books);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <main>
      <div className="h-screen bg-green-50 grid place-items-center">
        <section>
          BLA BLA BLA
        </section>
        <section>
          <Carousel
            activeItemIndex={activeItemIndex}
            setActiveItemIndex={setActiveItemIndex}
            carouselData={carouselData.current}
          />
        </section>
      </div>
    </main>
  );
};
