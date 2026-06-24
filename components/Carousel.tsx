'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { PhotoData } from '@/lib/fetchPhotos';

type Props = {
  images: PhotoData[];
};

const SWIPE_THRESHOLD = 30; // px of horizontal travel before a swipe counts
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

  const containerRef = useRef<HTMLDivElement>(null);
  const swipedRef = useRef(false);

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

  // Touch swipe (mobile). Native, non-passive listeners let us preventDefault
  // once a gesture locks horizontal — that stops the page scrolling vertically
  // mid-swipe (the "two scrolls fighting" feeling). One gesture = one slide;
  // vertical drags fall through and scroll the page normally.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let axis: 'x' | 'y' | null = null;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      axis = null;
      swipedRef.current = false;
    };

    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // Lock the gesture to an axis after a few px of travel.
      if (axis === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
      if (axis !== 'x') return;

      e.preventDefault(); // own the gesture — no vertical scroll
      if (!swipedRef.current && Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx > 0) goPrev();
        else goNext();
        swipedRef.current = true;
      }
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
    };
  }, [goNext, goPrev]);

  const handleImageClick = (index: number) => {
    // Ignore the tap that ends a swipe so a drag doesn't open the modal.
    if (swipedRef.current) return;
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="group relative flex h-96 w-full select-none items-center justify-center touch-pan-y"
      >
        <button
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 z-40 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 p-2.5 text-white/70 opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/45 hover:text-white focus-visible:opacity-100 group-hover:opacity-100 sm:flex md:left-4"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

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
                className="absolute cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
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
                        // The slide is a fixed ~226px-wide phone. On phones the
                        // high DPR already pulls a crisp image from a small slot,
                        // but on desktop (often DPR 1, big screen) we need more
                        // pixels or it looks soft — so request a larger variant
                        // there. Higher quality keeps the wallpaper crisp.
                        sizes="(max-width: 640px) 340px, 480px"
                        quality={92}
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

        <button
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 z-40 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 p-2.5 text-white/70 opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/45 hover:text-white focus-visible:opacity-100 group-hover:opacity-100 sm:flex md:right-4"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative w-[80vw] h-[80vh]">
          <Image
            src={images[currentIndex]?.url}
            alt={`Portfolio photo ${currentIndex + 1}`}
            fill
            sizes="80vw"
            quality={90}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Carousel;
