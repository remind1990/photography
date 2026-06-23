'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { PhotoData } from '@/lib/fetchPhotos';

type Props = {
  images: PhotoData[];
};

const SWIPE_THRESHOLD = 40; // px before a swipe counts
const WINDOW = 5; // how many slides to keep mounted on each side (preload range)

// Horizontal position per offset. Visible slides (|offset| <= 1) sit centre /
// left / right; the rest are parked off the sides (invisible) just to preload.
const slidePosition = (offset: number): string => {
  switch (offset) {
    case 0:
      return '50%';
    case -1:
      return '30%';
    case 1:
      return '70%';
    case -2:
      return '15%';
    case 2:
      return '85%';
    default:
      return offset < 0 ? '0%' : '100%';
  }
};

const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const count = images.length;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (count ? (i + 1) % count : 0));
  }, [count]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (count ? (i - 1 + count) % count : 0));
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Signed circular distance from the current slide, in range [-count/2, count/2]
  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  const markLoaded = (url: string) =>
    setLoaded((prev) => (prev[url] ? prev : { ...prev, [url]: true }));

  // Touch swipe (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };
  const onTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) goPrev();
    else if (touchDeltaX.current < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handleImageClick = (index: number) => {
    // Ignore the click that ends a swipe so a drag doesn't open the modal.
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) return;
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="relative flex items-center justify-center w-full h-96 select-none touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="hidden sm:flex absolute left-0 z-40">
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="btn-carousel"
          >
            &lt;
          </button>
        </div>

        <div className="relative flex items-center justify-center w-full h-full">
          {images.map((image, index) => {
            const offset = getOffset(index);

            // Keep a wide window mounted (±5): only 3 slides are visible, the
            // other 8 are invisible preloaders that eager-load in parallel, so
            // every slide is already decoded before it scrolls in — the user
            // never sees a flicker.
            if (Math.abs(offset) > WINDOW) return null;

            const isVisible = Math.abs(offset) <= 1;
            const isCurrent = offset === 0;

            const zIndex = isCurrent ? 30 : Math.abs(offset) === 1 ? 20 : 10;
            const scale = isCurrent ? 1.1 : Math.abs(offset) === 1 ? 0.95 : 0.8;

            // Visible slides fade in once loaded (smooth); the off-screen
            // preload slides stay invisible — they exist only to warm the cache.
            const opacity = isVisible ? (loaded[image.url] ? 1 : 0) : 0;

            return (
              <div
                key={image.url}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  zIndex,
                  transform: `translateX(-50%) scale(${scale})`,
                  left: slidePosition(offset),
                  opacity,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                <div
                  className="relative w-[230px] h-[450px] bg-black shadow-lg overflow-hidden flex items-center justify-center rounded-[30px] border-[12px] border-transparent"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="absolute z-10 top-2 w-[60px] h-[15px] bg-stone-800 rounded-lg" />
                  <div className="absolute z-10 bottom-1 w-[75px] h-[5px] bg-stone-800 rounded-lg" />
                  <div className="absolute inset-0">
                    <Image
                      src={image.url}
                      alt={`Portfolio photo ${index + 1}`}
                      fill
                      // Current slide is the LCP image (priority); every other
                      // windowed slide loads eagerly so the whole window fetches
                      // in parallel and is ready before it scrolls into view.
                      {...(isCurrent
                        ? { priority: true }
                        : { loading: 'eager' as const })}
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      onLoad={() => markLoaded(image.url)}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden sm:flex absolute right-0 z-40">
          <button onClick={goNext} aria-label="Next" className="btn-carousel">
            &gt;
          </button>
        </div>
      </div>

      {/* Buttons below the carousel on mobile */}
      <div className="flex justify-between mt-20 mx-auto w-[50%] sm:hidden">
        <button onClick={goPrev} aria-label="Previous" className="btn-carousel">
          &lt;
        </button>
        <button onClick={goNext} aria-label="Next" className="btn-carousel">
          &gt;
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative w-[80vw] h-[80vh]">
          <Image
            src={images[currentIndex]?.url}
            alt={`Portfolio photo ${currentIndex + 1}`}
            fill
            sizes="80vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Carousel;
