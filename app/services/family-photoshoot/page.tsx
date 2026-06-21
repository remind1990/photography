import React from 'react';
import type { Metadata } from 'next';
import ServiceLanding from '@/components/ServiceLanding';

export const metadata: Metadata = {
  title: "Family Photoshoot in St. John's, Newfoundland",
  description:
    "Warm, natural family photography in St. John's, Newfoundland and Labrador. Capture the love and connection that make your family unique. Book your family photoshoot with Dubenko Photography.",
  keywords: [
    'family photographer St. Johns',
    'family photoshoot Newfoundland',
    'family photography St. Johns NL',
    'newborn and family photographer Newfoundland',
  ],
  alternates: { canonical: '/services/family-photoshoot' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Family Photography',
  name: "Family Photoshoot in St. John's, Newfoundland",
  provider: { '@id': 'https://dubenko-olya-ph.com/#business' },
  areaServed: { '@type': 'City', name: "St. John's" },
  url: 'https://dubenko-olya-ph.com/services/family-photoshoot',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLanding
        heroImage="/photo4.jpg"
        eyebrow="Family Photography"
        title="Family Photoshoots in St. John's, Newfoundland"
        intro="What matters most about every family is the love that binds you together — those little connections that make your family like no other. As a family photographer based in St. John's, Newfoundland, my job is to capture that bond so anyone who sees your images can feel the warmth and love that define your family."
        includes={[
          'Pre-shoot consultation to plan your location and style',
          "Sessions at your favourite spots around St. John's and Newfoundland",
          'Relaxed, natural direction — great for kids and grandparents alike',
          'Professionally edited high-resolution photos',
          'A private online gallery to view and download your images',
        ]}
        localBlurb="From the colourful houses of Jellybean Row to the cliffs of Signal Hill and the beaches along the Newfoundland coast, St. John's offers stunning backdrops for family photography in every season. Whether it's an extended family gathering or a quiet moment with your little ones, I'll help you feel comfortable so the real connection shines through."
        galleryImages={['/photo1.jpg', '/photo5.jpg', '/photo7.jpg']}
      />
    </>
  );
}
