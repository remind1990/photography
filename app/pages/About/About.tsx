import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

type Props = {};

const About = (props: Props) => {
  const t = useTranslations('About');

  return (
    <section className="w-full flex flex-col">
      <div className="w-full flex min-h-[700px] items-center justify-center bg-[url('/bg2.jpg')] bg-center bg-cover text-stone-100 relative">
        <h1 className="text-4xl">{t('section_title')}</h1>
        <Image
          className="absolute bottom-[-200px]"
          src="/photo6.jpg"
          alt="avatar"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full text-center main-bg p-11 pt-[220px] gap-11">
        <h1 className="text-4xl">{t('welcome_message')}</h1>
      </div>
      <div className="w-full flex main-bg p-11 gap-11">
        <div className="max-w-[50%]">
          <blockquote className="font-serif italic text-xl text-stone-800 my-6 py-4 px-6">
            {t('introduction')}
          </blockquote>
        </div>
        <div className="max-w-[50%]">
          <Image src="/photo8.jpg" alt="avatar" width={500} height={500} />
          <blockquote className="font-serif italic text-xl text-stone-800 my-6 py-4 px-6 border-l-4 border-gray-300 max-w-[500px]">
            {t('quote')}
            <cite className="block mt-2 text-right text-stone-600">
              {t('quote_author')}
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
