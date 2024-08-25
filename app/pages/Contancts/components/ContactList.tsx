// components/ContactList.tsx
'use client';
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
      <h2 className="text-xl">Hey you write to me by one of my socials!</h2>
      <ul className="flex flex-col gap-4 text-stone-800">
        <li className="flex items-center gap-2 ">
          <FaFacebook className="text-blue-600 text-xl" />
          <a
            className="text-blue-500"
            href="https://www.facebook.com/profile.php?id=100093081824477"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
        <li className="flex items-center gap-2">
          <FaInstagram className="text-pink-500 text-xl" />
          <a
            className="text-blue-500"
            href="https://www.instagram.com/dubenko_olya_ph/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
        {/* <li className="flex items-center gap-2">
          <FaTwitter className="text-blue-400" />
          <a
            href="https://www.twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li> */}
        <li className="flex items-center gap-2">
          <FaEnvelope className="text-gray-600 text-xl" />
          <a className="text-blue-500" href="mailto:dubenko.o.m@gmail.com">
            Email
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactList;
