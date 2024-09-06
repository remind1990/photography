import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase.config';

const userId = 'LHo7g0RQNqSwoiHk4LNAWzZgv9j2';
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
