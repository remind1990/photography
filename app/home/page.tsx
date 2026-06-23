import type { Metadata } from 'next';
import Main from '../pages/Main/Main';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Get to know Olha Dubenko — a photographer in St. John's, Newfoundland offering individual portraits and family photoshoots. Discover my style and book your session.",
  alternates: { canonical: '/home' },
};

export default function Page() {
  return <Main />;
}
