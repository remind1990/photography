'use client';
import { useTransition } from 'react';
import { Locale } from '@/config';
import { setUserLocale } from '@/services/locale';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
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
      <select
        id="locale-select"
        defaultValue={defaultValue}
        onChange={onChange}
        className={`rounded-sm p-2 transition-colors hover:bg-slate-200 ${
          isPending ? 'pointer-events-none opacity-60' : ''
        }`}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
