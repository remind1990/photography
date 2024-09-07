import React from 'react';
import Gallery from '../pages/Gallery/Gallery';
import { fetchPhotos } from '@/lib/fetchPhotos';

const page = async () => {
  return <Gallery />;
};

export default page;
