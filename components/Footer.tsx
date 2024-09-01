import React from 'react';
import Socials from './Socials';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

function Footer() {
  const t = useTranslations('Footer');

  return (
    <div className="min-h-[500px] bg-black text-white xl:px-40 px-10 py-20 flex flex-col md:flex-row md:gap-10 gap-5 align-top">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">{t('contact_title')}</h2>
        <p>{t('email')}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold">{t('follow_me')}</h2>
        <Socials />
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold">{t('quick_links')}</h2>
        <ul>
          <li>
            <Link href="portfolio" className="hover:underline">
              {t('portfolio')}
            </Link>
          </li>
          <li>
            <Link href="services" className="hover:underline">
              {t('services')}
            </Link>
          </li>
          <li>
            <Link href="contacts" className="hover:underline">
              {t('contacts')}
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-8 text-sm">
        <p
          dangerouslySetInnerHTML={{
            __html: t('copyright', { year: new Date().getFullYear() }),
          }}
          className="w-[200px] md:w-[100px]"
        ></p>
        <a href="/privacy-policy" className="hover:underline">
          {t('privacy_policy')}
        </a>{' '}
        |{' '}
        <a href="/terms-of-service" className="hover:underline">
          {t('terms_of_service')}
        </a>
      </div>
    </div>
  );
}

export default Footer;
