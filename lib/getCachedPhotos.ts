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
// The cached fetch lets fetchPhotos throw on failure, so unstable_cache never
// stores an empty/error result (a throw is not cached). The key is versioned so
// bumping it discards any previously cached empty list from a past outage.
const cachedFetch = unstable_cache(
  async (): Promise<PhotoData[]> => fetchPhotos(),
  ['gallery-photos-v2'],
  {
    tags: ['photos'],
    revalidate: 3600, // refresh from Firebase at most once per hour
  }
);

export async function getCachedPhotos(): Promise<PhotoData[]> {
  try {
    return await cachedFetch();
  } catch (error) {
    // Firebase failed for this request — render an empty gallery so the site
    // stays up, but DON'T cache it. The next request retries Firebase.
    console.error(
      'getCachedPhotos: Firebase unavailable, rendering empty',
      error
    );
    return [];
  }
}
