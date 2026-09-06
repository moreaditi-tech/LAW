'use client';

import { usePathname } from 'next/navigation';
import { FIRM } from '@/lib/constants';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1220] py-6 w-full border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-white/40 text-sm font-body tracking-wider text-center">
          &copy; {FIRM.name} {currentYear}
        </p>
      </div>
    </footer>
  );
}
