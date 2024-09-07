import { deleteObject, getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase.config';
import { userId } from '@/constants/constants';

export const fetchPhotos = async (): Promise<string[]> => {
  try {
    const photosRef = ref(storage, `photos/${userId}/`);
    const res = await listAll(photosRef);
    const urls = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    );
    return urls;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const deletePhoto = async (photoUrl: string): Promise<void> => {
  console.log(photoUrl);
  try {
    const photoRef = ref(storage, photoUrl);
    await deleteObject(photoRef);
    console.log('Photo deleted successfully');
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};
