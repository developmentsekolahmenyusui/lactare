'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/shared/lib/shadcn';

const NAV_ITEMS = [
  { href: '/transaction', label: 'Transaction' },
  { href: '/registration-config', label: 'Config' },
];

export function PrivateNavbar() {
  const pathname = usePathname();

  return (
    <nav className='sticky top-0 z-10 flex flex-row items-center justify-center gap-6 border-b bg-white/95 px-6 py-4 text-sm font-medium backdrop-blur'>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn('text-foreground hover:text-primary transition-colors', isActive && 'text-primary')}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
