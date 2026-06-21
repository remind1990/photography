'use server';
import { revalidateTag } from 'next/cache';

// Server action: drop the cached gallery read (see getCachedPhotos) so the next
// visitor gets fresh photos immediately after an admin upload/delete, instead of
// waiting for the revalidate window to expire.
export async function revalidatePhotos() {
  revalidateTag('photos');
}
