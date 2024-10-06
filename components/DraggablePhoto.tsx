import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
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
}

function DraggablePhoto({ url, index, movePhoto }: DraggablePhotoProps) {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [, ref] = useDrag<DragItem>({
    type: ItemType.PHOTO,
    item: { index, type: ItemType.PHOTO },
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
    <div ref={dragRef} className="relative w-full h-[500px] cursor-pointer">
      <Image
        src={url}
        alt={`Photo ${index}`}
        className="w-full h-full object-cover"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}

export default DraggablePhoto;
