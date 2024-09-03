// src/lib/fetchPhotos.ts

import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase.config';

const userId = 'LHo7g0RQNqSwoiHk4LNAWzZgv9j2';
export const fetchPhotos = async (): Promise<string[]> => {
  try {
    console.log(`Fetching photos for user: ${userId}`); // Debugging output
    const photosRef = ref(storage, `photos/${userId}/`);
    const res = await listAll(photosRef);
    const urls = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    );
    console.log(`Fetched URLs: ${urls}`); // Debugging output
    return urls;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error; // Re-throw the error to handle it in `getStaticProps` or `getServerSideProps`
  }
};
