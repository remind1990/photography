import { ref, updateMetadata } from 'firebase/storage';
import { PhotoData } from './fetchPhotos';
import { storage } from './firebase.config';
import { userId } from '@/constants/constants';

export const updatePhotoOrder = async (photoArray: PhotoData[]) => {
  try {
    const updatePromises = photoArray.map(async (photo) => {
      const photoRef = ref(
        storage,
        `photos/${userId}/${extractFileNameFromUrl(photo.url)}`
      );
      const metadata = {
        customMetadata: {
          order: photo.order.toString(),
        },
      };
      await updateMetadata(photoRef, metadata);
    });

    await Promise.all(updatePromises);
    console.log('Orders updated successfully');
  } catch (error) {
    console.error('Failed to update photo orders:', error);
  }
};

const extractFileNameFromUrl = (url: string) => {
  const decodedUrl = decodeURIComponent(url);
  const parts = decodedUrl.split('/');
  return parts[parts.length - 1].split('?')[0];
};
