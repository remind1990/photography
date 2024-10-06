export const convertToWebP = async (imageFile: File): Promise<File> => {
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
          0.8
        );
      };
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
};
