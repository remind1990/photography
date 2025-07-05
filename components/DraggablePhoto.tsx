import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export interface DragItem {
  index: number;
  type: string;
}

const ItemType = {
  PHOTO: 'photo',
};

export interface DraggablePhotoProps {
  url: string;
  index: number;
  movePhoto: (fromIndex: number, toIndex: number) => void;
  canDrag?: boolean;
}

function DraggablePhoto({
  url,
  index,
  movePhoto,
  canDrag,
}: DraggablePhotoProps) {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  const [, ref] = useDrag<DragItem>({
    type: ItemType.PHOTO,
    item: { index, type: ItemType.PHOTO },
    canDrag,
  });

  const [, drop] = useDrop<DragItem>({
    accept: ItemType.PHOTO,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePhoto(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  useEffect(() => {
    if (dragRef.current) {
      ref(dragRef.current);
      drop(dragRef.current);
    }
  }, [ref, drop]);

  return (
    <div ref={dragRef} className="relative w-full aspect-[3/4] cursor-pointer">
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={url}
        alt={`Photo ${index}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{
          objectFit: 'contain',
          visibility: loading ? 'hidden' : 'visible',
        }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default DraggablePhoto;
