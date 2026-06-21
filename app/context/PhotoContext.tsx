'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { fetchPhotos, PhotoData } from '@/lib/fetchPhotos';
import { revalidatePhotos } from '@/lib/revalidatePhotos';

type PhotoContextType = {
  photos: PhotoData[];
  refetchPhotos: () => Promise<void>;
  loading: boolean;
  maxOrder: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
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
  initialPhotos: PhotoData[];
  children: ReactNode;
};

const sortPhotos = (photos: PhotoData[]) =>
  [...photos].sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

export const PhotoProvider = ({
  initialPhotos,
  children,
}: PhotoProviderProps) => {
  const [photos, setPhotos] = useState<PhotoData[]>(initialPhotos);
  const [loading, setLoading] = useState(false);
  const [maxOrder, setMaxOrder] = useState(0);

  const calculateMaxOrder = (photos: PhotoData[]) => {
    return photos.length > 0
      ? Math.max(...photos.map((photo) => photo.order))
      : 0;
  };
  const refetchPhotos = async () => {
    setLoading(true);
    const updatedPhotos = await fetchPhotos();
    if (updatedPhotos?.length > 0) {
      setPhotos(sortPhotos(updatedPhotos));
    }
    // Bust the server-side cache so public visitors see the change immediately.
    await revalidatePhotos();
    setLoading(false);
  };

  useEffect(() => {
    setMaxOrder(calculateMaxOrder(photos));
  }, [photos]);

  return (
    <PhotoContext.Provider
      value={{ photos, refetchPhotos, loading, maxOrder, setLoading }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
