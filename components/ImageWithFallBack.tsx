import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ImageWithFallBackProps = ImageProps & {
  fallbackClassName?: string;
};

const ImageWithFallBack: React.FC<ImageWithFallBackProps> = ({
  fallbackClassName = 'absolute inset-0 bg-gray-200 animate-pulse rounded',
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && <div className={fallbackClassName} />}
      <Image
        {...props}
        alt={props.alt || 'Image'}
        onLoadingComplete={() => setLoading(false)}
        onLoad={() => setLoading(false)}
        style={loading ? { visibility: 'hidden' } : {}}
      />
    </div>
  );
};

export default ImageWithFallBack;
