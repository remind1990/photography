import React from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ServiceLanding from '@/components/ServiceLanding';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Services.love');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: [
      'couples photographer St. Johns',
      'engagement photoshoot Newfoundland',
      'love story photography St. Johns NL',
      'couple photographer Newfoundland',
    ],
    alternates: { canonical: '/services/love-story' },
  };
}

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
  const t = useTranslations('Services.love');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLanding
        heroImage="/photo7.jpg"
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
        includes={t.raw('includes') as string[]}
        localBlurb={t('localBlurb')}
        galleryImages={['/photo5.jpg', '/photo1.jpg', '/photo4.jpg']}
      />
    </>
  );
}
