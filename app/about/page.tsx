import React from 'react';
import type { Metadata } from 'next';
import About from '../pages/About/About';

export const metadata: Metadata = {
  title: 'About Olha Dubenko',
  description:
    "Meet Olha Dubenko, a professional photographer based in St. John's, Newfoundland, dedicated to capturing the unique beauty, strength and confidence of every client.",
  alternates: { canonical: '/about' },
};

const page = () => {
  return <About />;
};

export default page;
