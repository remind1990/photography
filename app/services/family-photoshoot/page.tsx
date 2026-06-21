import React from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ServiceLanding from '@/components/ServiceLanding';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Services.family');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: [
      'family photographer St. Johns',
      'family photoshoot Newfoundland',
      'family photography St. Johns NL',
      'newborn and family photographer Newfoundland',
    ],
    alternates: { canonical: '/services/family-photoshoot' },
  };
}

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
  const t = useTranslations('Services.family');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLanding
        heroImage="/photo4.jpg"
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
        includes={t.raw('includes') as string[]}
        localBlurb={t('localBlurb')}
        galleryImages={['/photo1.jpg', '/photo5.jpg', '/photo7.jpg']}
      />
    </>
  );
}
