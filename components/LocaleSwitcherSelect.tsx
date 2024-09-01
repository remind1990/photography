'use client';
import { useTransition } from 'react';
import { Locale } from '@/config';
import { setUserLocale } from '@/services/locale';
import { FaChevronDown } from 'react-icons/fa';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string; flag: string }>; // Using emoji or text for flags
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <label htmlFor="locale-select" className="sr-only">
        {label}
      </label>
      <div className="relative inline-block w-full">
        <select
          id="locale-select"
          defaultValue={defaultValue}
          onChange={onChange}
          className={`appearance-none w-full bg-transparent p-2 pl-10 pr-8 cursor-pointer rounded-md text-base text-slate-900 focus:outline-none ${
            isPending ? 'pointer-events-none opacity-60' : ''
          }`}
          style={{
            backgroundImage: 'none', // Remove custom background image
          }}
        >
          {items.map((item) => (
            <option
              key={item.value}
              value={item.value}
              className="flex items-center"
            >
              {item.label}
            </option>
          ))}
        </select>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <span>{items.find((item) => item.value === defaultValue)?.flag}</span>
        </div>
        <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-600" />
      </div>
    </div>
  );
}
