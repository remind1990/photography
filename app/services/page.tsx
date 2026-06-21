import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Photography Services in St. John's, Newfoundland",
  description:
    "Photography services in St. John's, Newfoundland and Labrador: family photoshoots, individual portraits and love-story sessions. Book your session with Dubenko Photography.",
  keywords: [
    'photography services St. Johns',
    "St. John's photographer",
    'Newfoundland photographer',
    'book a photographer St. Johns NL',
  ],
  alternates: { canonical: '/services' },
};

const services = [
  {
    href: '/services/family-photoshoot',
    image: '/photo4.jpg',
    title: 'Family Photoshoots',
    blurb:
      'Warm, natural photos that capture the love and connection unique to your family.',
  },
  {
    href: '/services/individual-portraits',
    image: '/photo3.jpg',
    title: 'Individual & Portraits',
    blurb:
      'Personal branding, portrait and lifestyle sessions built entirely around you.',
  },
  {
    href: '/services/love-story',
    image: '/photo7.jpg',
    title: 'Love Story & Couples',
    blurb:
      'Engagement, anniversary and couple sessions that capture your real connection.',
  },
];

export default function Page() {
  return (
    <section className="w-full flex flex-col">
      <div className="w-full flex flex-col items-center justify-center text-center px-6 py-20 bg-stone-100">
        <h1 className="text-3xl md:text-5xl max-w-3xl text-stone-800">
          Photography Services in St. John&apos;s, Newfoundland
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-600">
          Professional photography for every chapter of your story — from family
          gatherings to personal portraits and love stories — across St.
          John&apos;s and Newfoundland.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h2 className="text-2xl text-stone-800">{s.title}</h2>
              <p className="text-stone-600">{s.blurb}</p>
              <span className="mt-2 text-orange-600 group-hover:underline">
                Learn more →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 pb-20 px-6 text-center">
        <h2 className="text-2xl text-stone-800">
          Ready to book your photoshoot?
        </h2>
        <Link href="/contacts" className="btn-large btn-primary">
          Book a spot
        </Link>
      </div>
    </section>
  );
}
