// components/ContactList.tsx
'use client';
import Socials from '@/components/Socials';
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa';

const ContactList = () => {
  return (
    <div className="text-stone-800 w-full flex flex-col gap-8 items-start">
      <h2 className="text-xl">
        Easy way to find me! Follow me by one of my socials!
      </h2>
      <Socials />
    </div>
  );
};

export default ContactList;
