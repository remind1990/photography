import React from 'react';
import Gallery from '../pages/Gallery/Gallery';
import { fetchPhotos } from '@/lib/fetchPhotos';

const page = async () => {
  const photos = await fetchPhotos();
  return <Gallery photos={photos} />;
};

export default page;
