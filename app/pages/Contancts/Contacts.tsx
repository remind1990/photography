import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { useTranslations } from 'next-intl';

type Props = {};

const Contacts = (props: Props) => {
  const t = useTranslations('Contacts');

  return (
    <section className="w-full flex flex-col gap-20 main-bg">
      <div className="w-full flex min-h-[500px] items-center flex-col justify-center bg-[url('/bg3.jpg')] bg-center bg-cover text-stone-100">
        <h1 className="text-4xl">{t('section_title')}</h1>
        <blockquote className="italic text-xl text-stone-100 my-6 py-4 px-6 max-w-[400px]">
          {t('quote')}
          <cite className="block mt-2 text-right text-stone-100">
            {t('quote_author')}
          </cite>
        </blockquote>
      </div>
      <div className="w-full flex min-h-[500px] main-bg text-stone-100 px-40 pb-20 gap-4">
        <ContactList />
        <ContactForm />
      </div>
    </section>
  );
};

export default Contacts;
