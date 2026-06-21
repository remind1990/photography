import React from 'react';
import type { Metadata } from 'next';
import Contacts from '../pages/Contancts/Contacts';

export const metadata: Metadata = {
  title: 'Contact & Booking',
  description:
    "Book a photoshoot with Olha Dubenko in St. John's, Newfoundland. Get in touch by email or social media to plan your individual or family session.",
  alternates: { canonical: '/contacts' },
};

const page = () => {
  return <Contacts />;
};

export default page;
