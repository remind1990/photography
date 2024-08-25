'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
};

const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full h-96">
      <button
        onClick={handlePrevClick}
        className="absolute left-0 btn-carousel"
      >
        &lt;
      </button>
      <div className="relative flex items-center justify-center w-full">
        {images.map((src, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === (currentIndex + 1) % images.length;
          const isPrev =
            index === (currentIndex - 1 + images.length) % images.length;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ${
                isCurrent
                  ? 'z-20 transform scale-110 opacity-100'
                  : 'z-10 transform scale-95 opacity-70'
              }`}
              style={{
                left: isCurrent ? '50%' : isNext ? '75%' : '25%',
                transform: 'translateX(-50%)',
              }}
            >
              <div className="relative w-[230px] h-[450px] bg-white rounded-[30px] shadow-lg overflow-hidden flex items-center justify-center border-[12px] border-[#3b3b3d]">
                <div className="absolute z-10 top-2 w-[60px] h-[15px] bg-stone-800 rounded-lg" />
                <div className="absolute z-10 bottom-1 w-[75px] h-[5px] bg-stone-800 rounded-lg" />
                <div className="absolute inset-0">
                  <Image
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleNextClick}
        className="absolute right-0 btn-carousel"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
