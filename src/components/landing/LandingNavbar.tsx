'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const LandingNavbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between p-8 shadow-md backdrop-blur-lg">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative mr-4">
          <Image priority src="/images/meetly_logo.png" alt="OptiPixAI" width={250} height={67} />
        </div>
      </Link>

      {/* Bouton */}
      <div className="flex items-center gap-2">
        <Link href="/signin" className="gap-2">
          <Button
            size="lg"
            variant="default"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 px-4 py-1 text-[12px] font-semibold text-white sm:text-sm md:px-6 md:py-3 md:text-xl"
          >
            Admin Page
          </Button>
        </Link>
      </div>
    </nav>
  );
};
