'use client';
import Socials from '@/components/Socials';
import React from 'react';
import { useTranslations } from 'next-intl';

const ContactList = () => {
  const t = useTranslations('Contacts');

  return (
    <div className="text-stone-800 w-full flex flex-col gap-8 items-start">
      <h2 className="text-xl">{t('contact_list_title')}</h2>
      <Socials />
    </div>
  );
};

export default ContactList;
