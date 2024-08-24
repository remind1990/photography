'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type Props = {};

const NavBar: React.FC<Props> = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contacts', path: '/contacts' },
  ];

  return (
    <header className="flex items-center justify-between p-2 bg-orange-100 text-stone-800">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={30}
          className="mr-4 rounded-full cursor-pointer"
          onClick={() => router.push('/')}
        />
        <nav>
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
    </header>
  );
};

export default NavBar;
