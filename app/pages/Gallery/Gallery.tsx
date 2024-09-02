'use client';
import React, { useState, useEffect } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase.config';
import useAuth from '@/app/hooks/useAuth';
import Loader from '@/components/Loader';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

function Gallery() {
  const { user, loading } = useAuth();
  const [photos, setPhotos] = useState<string[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const t = useTranslations('Gallery');

  useEffect(() => {
    if (user) {
      fetchPhotos();
    }
  }, [user]);

  const fetchPhotos = async () => {
    const photosRef = ref(storage, `photos/${user?.uid}/`);
    try {
      setLoadingPhotos(true);
      const res = await listAll(photosRef);
      if (!res) {
        throw new Error('Something went wrong');
      }
      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setPhotos(urls);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  if (loading || loadingPhotos) {
    console.log(loading + ' photos loaded', loadingPhotos);
    return (
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-[400px]">
      <h1 className="my-5 text-6xl">{t('title')}</h1>
      <div className="grid grid-cols-4 gap-2 w-full">
        {photos.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`Photo ${index}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
