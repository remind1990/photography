import Image from 'next/image';
import React from 'react';

type Props = {};

const About = (props: Props) => {
  return (
    <section className=" w-full  flex flex-col">
      <div className="w-full flex min-h-[700px] items-center justify-center bg-[url('/bg2.jpg')] bg-center bg-cover text-stone-100 relative">
        <h1 className="text-4xl">About me</h1>
        <Image
          className="absolute bottom-[-200px]"
          src="/photo6.jpg"
          alt="avatar"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full   text-center main-bg p-11 pt-[220px] gap-11">
        <h1 className="text-4xl">Lets become friends!</h1>
      </div>
      <div className="w-full  flex main-bg p-11 gap-11">
        <div className="max-w-[50%]">
          <blockquote className="font-serif italic text-xl text-stone-800 my-6 py-4 px-6">
            "Hello, I'm Olha Dubenko, and I am truly honoured to welcome you to
            my photography journey. Photography has always been more than just a
            profession for me. it is a deep-seated passion that has grown over
            the years. Living in Canada, where we cherish diversity and
            individuality, I have been inspired to use my lens to celebrate the
            unique beauty found in everyone, particularly in women. My mission
            as a photographer is to help women see themselves in a light they
            may not have before—to see themselves as the beautiful, strong, and
            extraordinary individuals they truly are. I believe that every woman
            deserves to feel confident, valued, and empowered. Through my
            photography, I strive to capture not just an image, but the essence
            of who you are, reflecting your inner beauty and strength. It is my
            privilege to work closely with each of my clients, creating a safe
            and comfortable environment where you can express yourself freely.
            Whether it’s a portrait session, a celebration of a milestone, or
            simply a moment to honour your own journey, I am here to ensure that
            the experience is as enjoyable as the photos are stunning. Thank you
            for considering me as a part of your personal journey. I look
            forward to the opportunity to work together and to capture the
            beauty that is uniquely yours."
          </blockquote>
        </div>
        <div className="max-w-[50%]">
          <Image src="/photo8.jpg" alt="avatar" width={500} height={500} />
          <blockquote className="font-serif italic text-xl text-stone-800 my-6 py-4 px-6 border-l-4 border-gray-300">
            "The whole point of taking pictures is so that you don’t have to
            explain things with words."
            <cite className="block mt-2 text-right text-stone-600">
              — Lisa Kristine
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
