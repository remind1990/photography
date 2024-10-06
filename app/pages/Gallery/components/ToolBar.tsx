'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase.config';
import imageCompression from 'browser-image-compression';
import { userId } from '@/constants/constants';
import { usePhotoContext } from '@/app/context/PhotoContext';
import { convertToWebP } from '@/utils/convertImage';

type Props = {};

function ToolBar({}: Props) {
  const t = useTranslations('Gallery');
  const [files, setFiles] = useState<File[]>([]);
  const { refetchPhotos, maxOrder, setLoading } = usePhotoContext();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      await handleUpload(selectedFiles);
    }
  };

  const handleUpload = async (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setLoading(true);
      for (const file of selectedFiles) {
        let imageFile = file;
        if (file.size > 512 * 1024) {
          const options = {
            maxSizeMB: 0.5,
            useWebWorker: true,
          };
          try {
            imageFile = await imageCompression(file, options);
            console.log('Image compressed');
          } catch (error) {
            console.error('Error during compression:', error);
            return;
          }
        }
        try {
          const webpFile = await convertToWebP(imageFile);
          const storageRef = ref(storage, `photos/${userId}/${file.name}.webp`);
          const metadata = {
            customMetadata: {
              order: String(maxOrder + 1) || '0',
            },
          };
          await uploadBytes(storageRef, webpFile, metadata);
          await refetchPhotos();
        } catch (error) {
          console.error('Error during upload:', error);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="my-5 text-6xl">{t('title')}</h1>
      <label className="w-full flex gap-2 items-center p-2  my-5 bg-orange-100 rounded-lg shadow-lg tracking-wide uppercase  cursor-pointer hover:bg-orange-200 text-stone-600 hover:text-stone-800  justify-center">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.94l-2.12-2.12a1 1 0 00-1.41 0L10 10.17 6.65 6.82a1 1 0 00-1.41 0L3.12 8.94a1 1 0 000 1.41l2.12 2.12L10 14.83l3.35-3.35 3.53 3.53c.39.39 1.02.39 1.41 0l2.12-2.12a1 1 0 000-1.41L16.88 9.94zM6 6.17l-2-2L10 1l6 6-4.29 4.29L6 6.17z" />
        </svg>
        <span className="text-base leading-normal">{t('upload_photos')}</span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </label>
    </div>
  );
}

export default ToolBar;
