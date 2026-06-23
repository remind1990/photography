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

// Graphite finish — a dark titanium look that sits well on the site. `frame` is
// the metallic edge-highlight gradient (the light stops are the reflections);
// `button` tints the side keys.
const PHONE_COLORS: { name: string; frame: string; button: string }[] = [
  {
    name: 'Graphite',
    frame:
      'linear-gradient(145deg,#80807d 0%,#343330 16%,#54524d 38%,#272622 62%,#46443f 84%,#8c8c88 100%)',
    button: '#302f2c',
  },
];

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

            // Show the phone frame immediately for visible slides; the photo
            // itself fades in once decoded. Off-screen preload slides stay
            // hidden — they exist only to warm the cache.
            const wrapperOpacity = isVisible ? 1 : 0;
            const color = PHONE_COLORS[index % PHONE_COLORS.length];

            return (
              <div
                key={image.url}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  zIndex,
                  transform: `translateX(-50%) scale(${scale})`,
                  left: slidePosition(offset),
                  opacity: wrapperOpacity,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                {/* Phone body — metallic frame with edge highlights */}
                <div
                  onClick={() => handleImageClick(index)}
                  className="relative w-[236px] h-[472px] rounded-[52px] p-[4px] shadow-[0_25px_45px_-12px_rgba(0,0,0,0.65)]"
                  style={{ background: color.frame }}
                  title={color.name}
                >
                  {/* Side buttons */}
                  <div
                    className="absolute -left-[2px] top-[92px] h-[24px] w-[3px] rounded-l-sm"
                    style={{ backgroundColor: color.button }}
                  />
                  <div
                    className="absolute -left-[2px] top-[130px] h-[40px] w-[3px] rounded-l-sm"
                    style={{ backgroundColor: color.button }}
                  />
                  <div
                    className="absolute -left-[2px] top-[182px] h-[40px] w-[3px] rounded-l-sm"
                    style={{ backgroundColor: color.button }}
                  />
                  <div
                    className="absolute -right-[2px] top-[150px] h-[64px] w-[3px] rounded-r-sm"
                    style={{ backgroundColor: color.button }}
                  />

                  {/* Thin black bezel — uniform around the screen */}
                  <div className="relative h-full w-full rounded-[48px] bg-black p-[3px]">
                    {/* Screen */}
                    <div className="relative h-full w-full overflow-hidden rounded-[45px] bg-black">
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
                        // The slide is a fixed ~226px-wide phone, so request a
                        // small variant (sharp on retina) instead of a viewport-
                        // sized image — far less to download, much faster.
                        sizes="240px"
                        className="object-cover transition-opacity duration-700 ease-out"
                        style={{ opacity: loaded[image.url] ? 1 : 0 }}
                        onLoad={() => markLoaded(image.url)}
                        draggable={false}
                      />

                      {/* Dynamic Island — slim floating pill */}
                      <div className="absolute left-1/2 top-[12px] z-20 flex h-[17px] w-[58px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[6px]">
                        {/* camera lens dot */}
                        <span className="h-[7px] w-[7px] rounded-full bg-[#0b1418] ring-[1.5px] ring-[#1c2a30]" />
                      </div>

                      {/* Glass reflection / sheen over the screen */}
                      <div
                        className="pointer-events-none absolute inset-0 z-10"
                        style={{
                          background:
                            'linear-gradient(125deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.12) 100%)',
                        }}
                      />
                    </div>
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
