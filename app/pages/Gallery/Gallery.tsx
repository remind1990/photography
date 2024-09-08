'use client';
import { useState } from 'react';
import ToolBar from './components/ToolBar';
import Modal from '@/components/Modal';
import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';
import { usePhotoContext } from '@/app/context/PhotoContext';
import { deletePhoto } from '@/lib/fetchPhotos';
import Loader from '@/components/Loader';
import { useTranslations } from 'next-intl';

export default function GalleryPage() {
  const { photos, refetchPhotos, loading } = usePhotoContext();
  const t = useTranslations('Gallery');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async (photoUrl: string) => {
    try {
      await deletePhoto(photoUrl);
      await refetchPhotos();
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[400px]">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!user ? (
            <h1 className="my-5 text-6xl">{t('title')}</h1>
          ) : (
            <ToolBar />
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
            {photos.map((url, index) => (
              <div
                key={index}
                className="relative w-full h-[500px] cursor-pointer"
              >
                <img
                  src={url}
                  alt={`Photo ${index}`}
                  className="w-full h-full object-cover"
                  onClick={() => openModal(index)}
                />
                {user && (
                  <button
                    className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full p-2 hover:bg-red-700"
                    onClick={() => handleDelete(url)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
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
        </>
      )}
    </div>
  );
}
