import React from 'react';
import type { Metadata } from 'next';
import SignIn from '../pages/SignIn/SignIn';

// Admin sign-in — keep it out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const pages = () => {
  return <SignIn />;
};

export default pages;
