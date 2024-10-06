import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  getMetadata,
} from 'firebase/storage';
import { storage } from '@/lib/firebase.config';
import { userId } from '@/constants/constants';

export type PhotoData = {
  url: string;
  order: number;
};

export const fetchPhotos = async (): Promise<PhotoData[]> => {
  try {
    const photosRef = ref(storage, `photos/${userId}/`);
    const res = await listAll(photosRef);
    const photoData = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        const order = parseInt(metadata.customMetadata?.order || '0', 10);
        return { url, order };
      })
    );
    photoData.sort((a, b) => a.order - b.order);
    return photoData;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const deletePhoto = async (photoUrl: string): Promise<void> => {
  try {
    const photoRef = ref(storage, photoUrl);
    await deleteObject(photoRef);
    console.log('Photo deleted successfully');
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};
