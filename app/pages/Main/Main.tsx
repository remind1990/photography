'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/ui/Button';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();
  return (
    <section className=" w-full  flex flex-col">
      <div className="w-full flex min-h-[700px] items-center justify-center bg-[url('/bg1.jpg')] bg-center bg-cover text-stone-100">
        <h1 className="text-4xl">Platform for creative people</h1>
      </div>
      <div className="w-full flex  main-bg p-11 pl-[150px] gap-11">
        <Image src="/photo1.jpg" alt="photo1" width={500} height={600} />
        <div className="w-full h-[625px] flex flex-col">
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum{' '}
          </p>

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
        <p className="text-xl w-[50%]">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum{' '}
        </p>
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
        <p className="text-xl w-[50%]">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum{' '}
        </p>
      </div>
      <div className="flex w-full min-h-[300px] p-11  gap-[30px] justify-center items-center">
        <div className="card">
          <p className="text-2xl">Individual photosession</p>
          <p className="text-xl m-w-[100%] max-h-[70%] overflow-auto">
            You might be wondering, "Why hire a photographer when I can just
            take some selfies and give it to AI?" It's true—I'm not an AI that
            can churn out a hundred photos in seconds. But that's exactly what
            makes me unique. I don’t rely on algorithms; I rely on my style and
            vision, which are shaped by you. When we work together, I take the
            time to understand your wishes and see who you truly are. While I
            may not produce hundreds of photos in an instant, I can guarantee
            that the memories and emotions we capture will be
            one-of-a-kind—something no AI could ever replicate.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              router.push('/contacts');
            }}
          >
            Book a spot
          </Button>
        </div>
        <div className="card">
          <p className="text-2xl">Family photosession</p>
          <p className="text-xl m-w-[100%]  max-h-[70%] overflow-auto">
            What’s most important about every family? It’s the love that binds
            you together, the unique connections you share that make your family
            like no other. My job? It’s to capture that bond, to make sure
            anyone who sees the images can feel the warmth and love that define
            your family
          </p>
          <Button
            variant="primary"
            onClick={() => {
              router.push('/contacts');
            }}
          >
            Book a spot
          </Button>
        </div>
        <div className="card">
          <p className="text-2xl">Love story</p>
          <p className="text-xl max-w-[100%] max-h-[70%] overflow-auto">
            This one’s my favorite! It’s for both of you, and my job is to
            capture the essence of what makes you two unique. Show me what you
            share—those little moments, the smiles, the love—and I’ll make sure
            to capture it all. No artificial flavors here, just the natural,
            beautiful connection that you already have.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              router.push('/contacts');
            }}
          >
            Book a spot
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Main;
