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
        className="absolute left-0  btn-carousel"
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
                isCurrent ? 'z-20 transform scale-100 opacity-100' : ''
              } ${
                isNext || isPrev ? 'z-10 transform scale-75 opacity-50' : ''
              }`}
              style={{
                left: isCurrent ? '50%' : isNext ? '75%' : '25%',
                transform: 'translateX(-50%)',
              }}
            >
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                width={isCurrent ? 400 : 300}
                height={isCurrent ? 300 : 200}
                className="rounded-lg shadow-lg"
              />
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
