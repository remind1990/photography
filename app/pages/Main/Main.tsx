'use client';
import React from 'react';
import Image from 'next/image';

const Main = () => {
  return (
    <main className=" w-full  flex flex-col">
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
          <p className="text-xl m-w-[100%] overflow-auto">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
        <div className="card">
          <p className="text-2xl">Family photosession</p>
          <p className="text-xl m-w-[100%] overflow-auto">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
        <div className="card">
          <p className="text-2xl">Love story</p>
          <p className="text-xl m-w-[100%] overflow-auto">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
      </div>
    </main>
  );
};

export default Main;
