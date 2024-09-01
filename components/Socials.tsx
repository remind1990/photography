import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

type Props = {};

const Socials = (props: Props) => {
  return (
    <ul className="flex flex-col gap-2 text-stone-800">
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
  );
};

export default Socials;
