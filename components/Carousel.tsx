'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';

type Props = {
  images: string[];
};

const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative flex items-center justify-center w-full h-96">
        <div className="hidden sm:flex absolute left-0">
          <button onClick={handlePrevClick} className="btn-carousel">
            &lt;
          </button>
        </div>
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
                className={`absolute transition-all duration-500 cursor-pointer`}
                style={{
                  zIndex: zIndex,
                  transform: `translateX(-50%) scale(${scale})`,
                  left: left,
                  opacity: isCurrent || isNext || isPrev ? 1 : 0,
                }}
              >
                <div
                  className="relative w-[230px] h-[450px] bg-white rounded-[30px] shadow-lg overflow-hidden flex items-center justify-center border-[12px] border-[#3b3b3d]"
                  onClick={() => handleImageClick(index)}
                >
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
        <div className="hidden sm:flex absolute right-0">
          <button onClick={handleNextClick} className="btn-carousel">
            &gt;
          </button>
        </div>
      </div>

      {/* Buttons displayed below the carousel on mobile */}
      <div className="flex justify-between mt-20  mx-auto w-[50%] sm:hidden">
        <button onClick={handlePrevClick} className="btn-carousel">
          &lt;
        </button>
        <button onClick={handleNextClick} className="btn-carousel">
          &gt;
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="relative w-[80vw] h-[80vh]">
          <Image
            src={images[currentIndex]}
            alt={`Carousel image ${currentIndex + 1}`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Modal>
    </>
  );
};

export default Carousel;
