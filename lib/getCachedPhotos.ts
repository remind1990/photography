import { unstable_cache } from 'next/cache';
import { fetchPhotos, PhotoData } from './fetchPhotos';

// Server-only cached read of the gallery photos.
//
// The root layout renders on every request. Without caching, each page view
// fires a `listAll` + per-photo `getMetadata`/`getDownloadURL` burst against
// Firebase Storage — dozens of operations per visit, which hammers the quota
// (and runs up Blaze operation costs).
//
// The gallery only changes when Olha uploads/deletes a photo, so we cache the
// list aggressively and invalidate on demand instead of polling on a timer:
//   • revalidate: 24h  — a safety net; Firebase is touched at most once a day
//     even with no mutations (e.g. if photos are changed outside the app).
//   • tags: ['photos'] — the admin's upload/delete flow calls
//     revalidateTag('photos') (see revalidatePhotos), so a change Olha makes is
//     reflected on the public site IMMEDIATELY, without waiting for the window.
//
// fetchPhotos throws on failure, so unstable_cache never stores an empty/error
// result (a throw is not cached). The key is versioned so bumping it discards
// any list cached under an old strategy.
const ONE_DAY = 60 * 60 * 24;

const cachedFetch = unstable_cache(
  async (): Promise<PhotoData[]> => fetchPhotos(),
  ['gallery-photos-v3'],
  {
    tags: ['photos'],
    revalidate: ONE_DAY,
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
