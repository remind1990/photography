import React from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ServiceLanding from '@/components/ServiceLanding';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Services.individual');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: [
      'portrait photographer St. Johns',
      'individual photoshoot Newfoundland',
      'personal branding photographer St. Johns NL',
      'headshot photographer Newfoundland',
    ],
    alternates: { canonical: '/services/individual-portraits' },
  };
}

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
  const t = useTranslations('Services.individual');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLanding
        heroImage="/photo3.jpg"
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
        includes={t.raw('includes') as string[]}
        localBlurb={t('localBlurb')}
        galleryImages={['/photo2.jpg', '/photo6.jpg', '/photo8.jpg']}
      />
    </>
  );
}
