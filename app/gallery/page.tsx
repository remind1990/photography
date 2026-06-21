import React from 'react';
import type { Metadata } from 'next';
import Gallery from '../pages/Gallery/Gallery';

// Admin-only photo management screen — keep it out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const page = async () => {
  return <Gallery />;
};

export default page;
