'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/ui/Button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Main = () => {
  const t = useTranslations('HomePage');
  const router = useRouter();
  return (
    <section className=" w-full  flex flex-col">
      <div className="w-full flex min-h-[700px] p-2 items-center flex-col justify-center bg-[url('/bg1.jpg')] bg-center bg-cover text-stone-100">
        <h1 className="xl:text-6xl  text-3xl text-center">{t('title')}</h1>
        <blockquote className="italic text-xl sm:text-2xl text-stone-100 my-0 sm:my-2 py-4 px-6 max-w-[400px]">
          {t('title_quote')}
          <cite className="block mt-2 text-right text-stone-100">
            — {t('title_quote_author')}
          </cite>
        </blockquote>
      </div>
      <div className="w-full flex flex-col sm:flex-col md:flex-row  main-bg p-11 pl-1 lg:pl-[50px] xl:pl-[150px] md:pr-[20px] sm:pr-[10px]  pr-0 gap-11">
        <Image
          className="flex-shrink-0"
          src="/photo1.jpg"
          alt="photo1"
          width={500}
          height={600}
        />
        <div className="w-full h-[625px] flex flex-col gap-5">
          <p className="main-post-text md:max-h-[50%]  lg:max-h-[70%] overflow-auto">
            {t('photo1_text')}
          </p>
          <Image
            className="ml-0  sm:ml-auto mt-auto flex-shrink-0"
            src="/photo2.jpg"
            alt="photo2"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="main-post-container p-2 md:p-11">
        <p className="main-post-text2">{t('photo2_text')}</p>
        <div className="w-full md:w-[50%]">
          <Image
            className="ml-auto mt-auto"
            src="/photo3.jpg"
            alt="photo2"
            width={500}
            height={700}
          />
        </div>
      </div>
      <div className="main-post-container p-2 md:p-11 main-bg">
        <div className="w-full md:w-[50%] ">
          <Image
            className="mr-auto"
            src="/photo4.jpg"
            alt="photo2"
            width={500}
            height={700}
          />
        </div>
        <p className="main-post-text2">{t('photo3_text')}</p>
      </div>
      <div className="main-post-container xl:p-11 md:p-4 lg:p-6  xl:gap-[30px] my-5 md:mt-0   md:gap-2 justify-center items-center">
        <div className="card">
          <p className="text-2xl">{t('individual_label')}</p>
          <p className="global-text-sizes m-w-[100%] h-[70%] overflow-auto">
            {t('individual')}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              router.push('/contacts');
            }}
          >
            {t('book_spot')}
          </Button>
        </div>
        <div className="card">
          <p className="lg:text-2xl">{t('family_label')}</p>
          <p className="global-text-sizes m-w-[100%]  h-[70%] overflow-auto">
            {t('family')}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              router.push('/contacts');
            }}
          >
            {t('book_spot')}
          </Button>
        </div>
        <div className="card">
          <p className="text-2xl">{t('love_story_label')}</p>
          <p className="global-text-sizes max-w-[100%] h-[70%] overflow-auto">
            {t('love_story')}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              router.push('/contacts');
            }}
          >
            {t('book_spot')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Main;
