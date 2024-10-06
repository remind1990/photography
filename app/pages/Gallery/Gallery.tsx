'use client';
import { useState } from 'react';
import ToolBar from './components/ToolBar';
import Modal from '@/components/Modal';
import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';
import { usePhotoContext } from '@/app/context/PhotoContext';
import { deletePhoto, PhotoData } from '@/lib/fetchPhotos';
import Loader from '@/components/Loader';
import { useTranslations } from 'next-intl';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { updatePhotoOrder } from '@/lib/updateMetaData';
interface DragItem {
  index: number;
  type: string;
}

const ItemType = {
  PHOTO: 'photo',
};

interface DraggablePhotoProps {
  url: string;
  index: number;
  movePhoto: (fromIndex: number, toIndex: number) => void;
}

function DraggablePhoto({ url, index, movePhoto }: DraggablePhotoProps) {
  const [, ref] = useDrag<DragItem>({
    type: ItemType.PHOTO,
    item: { index, type: ItemType.PHOTO },
  });

  const [, drop] = useDrop<DragItem>({
    accept: ItemType.PHOTO,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePhoto(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="relative w-full h-[500px] cursor-pointer"
    >
      <img
        src={url}
        alt={`Photo ${index}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function GalleryPage() {
  const { photos, refetchPhotos, loading } = usePhotoContext();
  const t = useTranslations('Gallery');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { user } = useAuth();
  const [photoList, setPhotoList] = useState<PhotoData[]>(photos);

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

  const movePhoto = async (fromIndex: number, toIndex: number) => {
    const updatedPhotos = [...photoList];
    const [movedPhoto] = updatedPhotos.splice(fromIndex, 1);
    updatedPhotos.splice(toIndex, 0, movedPhoto);
    const reorderedPhotos = updatedPhotos.map((photo, index) => ({
      ...photo,
      order: index,
    }));
    setPhotoList(updatedPhotos);
    if (user) {
      updatePhotoOrder(reorderedPhotos)
        .then((res) => {
          alert('Photo updated successfully');
        })
        .catch((error) => {
          alert('Failed to update photo');
        });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
              {photoList.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-full h-[500px]"
                  onClick={() => openModal(index)}
                >
                  <DraggablePhoto
                    url={photo.url}
                    index={index}
                    movePhoto={movePhoto}
                  />
                  {user && (
                    <button
                      className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full p-2 hover:bg-red-700"
                      onClick={() => handleDelete(photo.url)}
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
                    src={photoList[currentIndex]?.url}
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
    </DndProvider>
  );
}
