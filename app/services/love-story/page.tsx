import React from 'react';
import type { Metadata } from 'next';
import ServiceLanding from '@/components/ServiceLanding';

export const metadata: Metadata = {
  title: "Love Story & Couple Photography in St. John's",
  description:
    "Romantic love-story and couple photoshoots in St. John's, Newfoundland. Engagement, anniversary and couples sessions that capture your natural connection. Book with Dubenko Photography.",
  keywords: [
    'couples photographer St. Johns',
    'engagement photoshoot Newfoundland',
    'love story photography St. Johns NL',
    'couple photographer Newfoundland',
  ],
  alternates: { canonical: '/services/love-story' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Couple & Engagement Photography',
  name: "Love Story & Couple Photography in St. John's",
  provider: { '@id': 'https://dubenko-olya-ph.com/#business' },
  areaServed: { '@type': 'City', name: "St. John's" },
  url: 'https://dubenko-olya-ph.com/services/love-story',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLanding
        heroImage="/photo7.jpg"
        eyebrow="Love Story & Couples"
        title="Love Story & Couple Photography in St. John's"
        intro="This one is my favourite. A love-story session is for both of you, and my job is to capture what makes you two unique. Show me the little moments, the smiles, the way you look at each other — and I'll capture the natural, beautiful connection you already share. No artificial flavours, just real love."
        includes={[
          'Engagement, anniversary or just-because couple sessions',
          'Help choosing a location that feels like you',
          'Relaxed direction so you both feel at ease',
          'Professionally edited high-resolution photos',
          'A private online gallery to view and download your images',
        ]}
        localBlurb="St. John's and the Newfoundland coast are made for love stories — sunrise at Cape Spear, the colourful streets downtown, or a quiet trail with the ocean behind you. Wherever your story lives, I'll help you relax and simply be together while I capture it."
        galleryImages={['/photo5.jpg', '/photo1.jpg', '/photo4.jpg']}
      />
    </>
  );
}
