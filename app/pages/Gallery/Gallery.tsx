'use client';
import Loader from '@/components/Loader';
import { useTranslations } from 'next-intl';
import ToolBar from './components/ToolBar';
import Modal from '@/components/Modal'; // Import your Modal component
import Image from 'next/image'; // For the image in the modal
import { useState } from 'react';

export default function GalleryPage({ photos }: { photos: string[] }) {
  const t = useTranslations('Gallery');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!photos.length) {
    return (
      <div className="flex flex-col items-center w-full min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-[400px]">
      <ToolBar />
      <div className="grid grid-cols-4 gap-2 w-full">
        {photos.map((url, index) => (
          <div
            key={index}
            className="w-full h-[500px] cursor-pointer"
            onClick={() => openModal(index)} // Open modal on click
          >
            <img
              src={url}
              alt={`Photo ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal for image */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="relative w-[80vw] h-[80vh]">
            <Image
              src={photos[currentIndex]}
              alt={`Carousel image ${currentIndex + 1}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
