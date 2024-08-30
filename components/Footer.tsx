import React from 'react';
import Socials from './Socials';
import Link from 'next/link';

function Footer() {
  return (
    <div className="min-h-[500px] bg-black text-white px-40  py-20 flex gap-20 align-top">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Contact</h2>
        <p>Email: dubenko.o.m@gmail.com</p>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Follow Me</h2>
        <Socials />
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Quick Links</h2>
        <ul>
          <li>
            <Link href="portfolio" className="hover:underline">
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="services" className="hover:underline">
              Services
            </Link>
          </li>
          <li>
            <Link href="contacts" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-8 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Olha Dubenko. All rights reserved.
        </p>
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>{' '}
        |{' '}
        <a href="/terms-of-service" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
}

export default Footer;
