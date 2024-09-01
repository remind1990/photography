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
      <div className="w-full flex min-h-[700px] items-center flex-col justify-center bg-[url('/bg1.jpg')] bg-center bg-cover text-stone-100">
        <h1 className="text-6xl">{t('title')}</h1>
        <blockquote className="italic text-2xl text-stone-100 my-6 py-4 px-6 max-w-[400px]">
          {t('title_quote')}
          <cite className="block mt-2 text-right text-stone-100">
            — {t('title_quote_author')}
          </cite>
        </blockquote>
      </div>
      <div className="w-full flex  main-bg p-11 pl-[150px] gap-11">
        <Image src="/photo1.jpg" alt="photo1" width={500} height={600} />
        <div className="w-full h-[625px] flex flex-col">
          <p className="text-xl w-[90%]"> {t('photo1_text')}</p>

          <Image
            className="ml-auto mt-auto"
            src="/photo2.jpg"
            alt="photo2"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="flex w-full min-h-[300px] p-11">
        <p className="text-xl w-[50%]">{t('photo2_text')}</p>
        <div className="w-[50%] ">
          <Image
            className="ml-auto mt-auto"
            src="/photo3.jpg"
            alt="photo2"
            width={500}
            height={700}
          />
        </div>
      </div>
      <div className="flex w-full min-h-[300px] p-11 main-bg">
        <div className="w-[50%] ">
          <Image
            className="mr-auto"
            src="/photo4.jpg"
            alt="photo2"
            width={500}
            height={700}
          />
        </div>
        <p className="text-xl w-[50%]">{t('photo3_text')}</p>
      </div>
      <div className="flex w-full min-h-[300px] p-11  gap-[30px] justify-center items-center">
        <div className="card">
          <p className="text-2xl">Individual photosession</p>
          <p className="text-xl m-w-[100%] h-[70%] overflow-auto">
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
          <p className="text-2xl">Family photosession</p>
          <p className="text-xl m-w-[100%]  h-[70%] overflow-auto">
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
          <p className="text-2xl">Love story</p>
          <p className="text-xl max-w-[100%] h-[70%] overflow-auto">
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
