import React from 'react';
import type { Metadata } from 'next';
import Portfolio from '../pages/Portfolio/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    "Browse the photography portfolio of Olha Dubenko — individual portraits and family sessions in St. John's, Newfoundland.",
  alternates: { canonical: '/portfolio' },
};

const page = async () => {
  return <Portfolio />;
};

export default page;
