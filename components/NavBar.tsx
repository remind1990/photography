'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';

type Props = {};

const NavBar: React.FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('portfolio'), path: '/portfolio' },
    { name: t('contacts'), path: '/contacts' },
    { name: t('gallery'), path: '/gallery' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between p-2 main-bg text-stone-800">
      <div className="flex items-center w-full">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={30}
          className="mr-4 rounded-full cursor-pointer"
          onClick={() => router.push('/')}
        />
        <div className="flex items-center">
          <button
            className="ml-4 flex flex-col justify-between h-6 w-8 md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <span className="block w-full h-[1px] bg-black"></span>
            <span className="block w-full h-[1px] bg-black"></span>
            <span className="block w-full h-[1px] bg-black"></span>
          </button>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${
                    pathname === item.path ? 'text-stone-900' : 'text-stone-500'
                  } hover:text-stone-700`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute top-12 left-0 w-full bg-white shadow-md z-10`}
      >
        <ul className="flex flex-col space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${
                  pathname === item.path ? 'text-stone-900' : 'text-stone-500'
                } hover:text-stone-700`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <LocaleSwitcher />
    </header>
  );
};

export default NavBar;
