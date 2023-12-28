import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CarouselProps {
  title: string;
  items: any[];
}

export default function Carousel(props: CarouselProps) {
  const { title, items } = props;

  const displacement = 575;

  const slideLeft = () => {
    const slider = document.getElementById("slider")!;

    slider.scrollLeft = slider.scrollLeft - displacement;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider")!;

    slider.scrollLeft = slider.scrollLeft + displacement;
  };

  return (
    <section className="">
      <h1 className="font-bold text-xl">{title}</h1>

      <div className="relative flex items-center">
        <FontAwesomeIcon icon={faAngleLeft} className='hidden md:block opacity-50 cursor-pointer hover:opacity-100 text-2xl mr-2' onClick={slideLeft}/>

        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {items.map((item, index) => (
            <div
              key={index}
              data-testid="trackImage"
              style={{ backgroundImage: `url(${item.images[0].url})` }}
              className="inline-block w-28 h-28 md:w-32 md:h-32 bg-cover bg-center rounded-lg m-2 first:ml-0 last:mr-0 shadow-[inset_0_-28px_28px_rgba(0,0,0,0.6)]"
            >
              <span className="text-white font-bold p-2 flex items-end whitespace-normal">{item.name}</span>
            </div>
          ))}
        </div>
        
        <FontAwesomeIcon icon={faAngleRight} className='hidden md:block opacity-50 cursor-pointer hover:opacity-100 text-2xl ml-2' onClick={slideRight}/>
      </div>
    </section>
  );
}

