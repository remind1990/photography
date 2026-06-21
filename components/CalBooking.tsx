'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Inline Cal.com booking widget. Visitors pick a day/time and Olha gets an
// email + a Google Calendar event. The public link is all that's needed —
// no API key. Event: One-on-one "photoshoot".
const CAL_LINK = 'olha-dubenko-89meri/photoshoot';

export default function CalBooking() {
  const t = useTranslations('Contacts');

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        // Match the site's warm palette (buttons #fad29e / hover #a99174).
        cssVarsPerTheme: {
          light: { 'cal-brand': '#a99174' },
          dark: { 'cal-brand': '#fad29e' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="w-full px-2 md:px-40 pb-20 flex flex-col gap-6">
      <h2 className="text-2xl text-stone-800 text-center">
        {t('booking_title')}
      </h2>
      <div className="w-full rounded-lg overflow-hidden bg-white shadow-lg">
        <Cal
          calLink={CAL_LINK}
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{ layout: 'month_view' }}
        />
      </div>
    </div>
  );
}
