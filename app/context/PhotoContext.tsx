'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { fetchPhotos } from '@/lib/fetchPhotos';

type PhotoContextType = {
  photos: string[];
  refetchPhotos: () => Promise<void>;
  loading: boolean;
};

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);
export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within a PhotoProvider');
  }
  return context;
};

type PhotoProviderProps = {
  initialPhotos: string[];
  children: ReactNode;
};

export const PhotoProvider = ({
  initialPhotos,
  children,
}: PhotoProviderProps) => {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [loading, setLoading] = useState(false);

  const refetchPhotos = async () => {
    setLoading(true);
    const updatedPhotos = await fetchPhotos();
    if (updatedPhotos?.length > 0) {
      setPhotos(updatedPhotos);
    }
    setLoading(false);
  };

  return (
    <PhotoContext.Provider value={{ photos, refetchPhotos, loading }}>
      {children}
    </PhotoContext.Provider>
  );
};
