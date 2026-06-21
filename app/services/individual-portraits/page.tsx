import React from 'react';
import type { Metadata } from 'next';
import ServiceLanding from '@/components/ServiceLanding';

export const metadata: Metadata = {
  title: "Individual & Portrait Photography in St. John's",
  description:
    "Personal branding, portrait and individual photoshoots in St. John's, Newfoundland. Feel confident and see yourself as the strong, beautiful person you are. Book your portrait session with Dubenko Photography.",
  keywords: [
    'portrait photographer St. Johns',
    'individual photoshoot Newfoundland',
    'personal branding photographer St. Johns NL',
    'headshot photographer Newfoundland',
  ],
  alternates: { canonical: '/services/individual-portraits' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Portrait Photography',
  name: "Individual & Portrait Photography in St. John's",
  provider: { '@id': 'https://dubenko-olya-ph.com/#business' },
  areaServed: { '@type': 'City', name: "St. John's" },
  url: 'https://dubenko-olya-ph.com/services/individual-portraits',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLanding
        heroImage="/photo3.jpg"
        eyebrow="Individual & Portrait"
        title="Individual & Portrait Photography in St. John's"
        intro="An individual photoshoot is about more than a nice picture — it's about seeing yourself in a light you may not have before. As a portrait photographer in St. John's, Newfoundland, I take the time to understand who you are and bring out your style, confidence and personality in every frame."
        includes={[
          'A relaxed session built entirely around you',
          'Guidance on outfits, posing and location',
          'Personal branding, portrait or lifestyle styles',
          'Professionally edited high-resolution photos',
          'A private online gallery to view and download your images',
        ]}
        localBlurb="Whether you need standout personal-branding images, professional headshots, or a portrait session that simply celebrates you, St. John's and the surrounding Newfoundland coastline provide a beautiful, distinctive backdrop. No algorithms, no mass-produced shots — just images that genuinely look like you."
        galleryImages={['/photo2.jpg', '/photo6.jpg', '/photo8.jpg']}
      />
    </>
  );
}
