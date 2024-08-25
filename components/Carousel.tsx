'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
};

const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevClick();
      } else if (event.key === 'ArrowRight') {
        handleNextClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          const zIndex = isCurrent ? 30 : isNext || isPrev ? 20 : 10;
          const scale = isCurrent ? 1.1 : 0.95;
          const left = isCurrent
            ? '50%'
            : isNext
            ? '70%'
            : isPrev
            ? '30%'
            : '50%';

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500`}
              style={{
                zIndex: zIndex,
                transform: `translateX(-50%) scale(${scale})`,
                left: left,
                opacity: isCurrent || isNext || isPrev ? 1 : 0,
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
