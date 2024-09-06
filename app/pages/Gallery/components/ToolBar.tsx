'use client';
import Button from '@/ui/Button';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase.config';
import imageCompression from 'browser-image-compression';

type Props = {};

function ToolBar({}: Props) {
  const t = useTranslations('Gallery');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const userId = 'LHo7g0RQNqSwoiHk4LNAWzZgv9j2'; // Your user ID
      let imageFile = file;

      // Compress if file size is greater than 512KB
      if (file.size > 512 * 1024) {
        const options = {
          maxSizeMB: 0.5, // 512KB max size
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

      // Convert the file to WebP
      try {
        const webpFile = await convertToWebP(imageFile);

        const storageRef = ref(storage, `photos/${userId}/${file.name}.webp`);
        await uploadBytes(storageRef, webpFile);
        alert('Photo uploaded successfully as WebP!');
      } catch (error) {
        console.error('Error during upload:', error);
      }
    } else {
      alert('Please select a file first');
    }
  };

  const convertToWebP = async (imageFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], imageFile.name + '.webp', {
                  type: 'image/webp',
                });
                resolve(webpFile);
              } else {
                reject(new Error('Conversion to WebP failed.'));
              }
            },
            'image/webp',
            0.8 // Quality of compression (adjust as needed)
          );
        };
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  };

  return (
    <div className="flex gap-5 items-center">
      <h1 className="my-5 text-6xl">{t('title')}</h1>
      <input type="file" className="input" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Add</Button>
    </div>
  );
}

export default ToolBar;
