import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

const Socials = () => {
  return (
    <ul className="flex flex-col gap-2 text-stone-800">
      <li className="flex items-center gap-2">
        <FaInstagram className="text-pink-500 text-xl" />
        <a
          className="text-blue-500"
          href="https://www.instagram.com/olya_photographer_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </li>
      <li className="flex items-center gap-2">
        <FaFacebook className="text-blue-600 text-xl" />
        <a
          className="text-blue-500"
          href="https://www.facebook.com/olha.dubenko.2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </li>
      <li className="flex items-center gap-2">
        <FaEnvelope className="text-gray-600 text-xl" />
        <a className="text-blue-500" href="mailto:dubenko.o.m@gmail.com">
          Email
        </a>
      </li>
    </ul>
  );
};

export default Socials;
