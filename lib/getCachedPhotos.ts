import { unstable_cache } from 'next/cache';
import { fetchPhotos, PhotoData } from './fetchPhotos';

// Server-only cached read of the gallery photos.
//
// The root layout renders on every request, so without caching each page view
// fires a `listAll` + per-photo `getMetadata`/`getDownloadURL` against Firebase
// Storage. On the free (Spark) plan that quickly burns the daily quota and the
// whole site 500s with `storage/quota-exceeded`.
//
// Caching collapses all those calls into one refresh per `revalidate` window.
// The admin's client-side `refetchPhotos` stays uncached, so uploads/deletes
// are still reflected immediately in the editing session; a full reload then
// picks up the change within the revalidate window (or instantly if you call
// `revalidateTag('photos')` after a mutation).
export const getCachedPhotos = unstable_cache(
  async (): Promise<PhotoData[]> => fetchPhotos(),
  ['gallery-photos'],
  {
    tags: ['photos'],
    revalidate: 3600, // refresh from Firebase at most once per hour
  }
);
