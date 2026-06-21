import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type ServiceLandingProps = {
  heroImage: string;
  eyebrow: string;
  title: string;
  intro: string;
  includes: string[];
  /** Local-SEO paragraph that mentions St. John's / Newfoundland naturally. */
  localBlurb: string;
  galleryImages?: string[];
};

// Presentational, server-rendered landing section shared by every /services/*
// page. Keyword-rich copy + a clear CTA to the booking page.
export default function ServiceLanding({
  heroImage,
  eyebrow,
  title,
  intro,
  includes,
  localBlurb,
  galleryImages = [],
}: ServiceLandingProps) {
  return (
    <section className="w-full flex flex-col">
      <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center text-stone-100 px-6 py-24">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/45 -z-10" />
        <p className="uppercase tracking-[0.3em] text-sm mb-4">{eyebrow}</p>
        <h1 className="text-3xl md:text-5xl max-w-3xl">{title}</h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-10">
        <p className="text-lg leading-relaxed text-stone-700">{intro}</p>

        <div>
          <h2 className="text-2xl mb-4">What&apos;s included</h2>
          <ul className="flex flex-col gap-2 text-stone-700">
            {includes.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg leading-relaxed text-stone-700">{localBlurb}</p>

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src) => (
              <div key={src} className="relative aspect-[3/4]">
                <Image
                  src={src}
                  alt={`${title} example`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-4 py-8">
          <h2 className="text-2xl text-center">
            Ready to book your photoshoot in St. John&apos;s?
          </h2>
          <Link href="/contacts" className="btn-large btn-primary">
            Book a spot
          </Link>
        </div>
      </div>
    </section>
  );
}
