'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const LandingHero = () => {
  return (
    <div className="space-y-10 pt-48 text-center font-bold text-white">
      <div className="text-[12px] font-light text-zinc-200 sm:text-sm md:text-xl">Schedule Smarter. Meet Better.</div>

      <div>
        <Link href="/login">
          <Button
            variant="default"
            className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-4 text-[12px] font-semibold shadow-lg shadow-indigo-500/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
          >
            Go to Dashdoard!
          </Button>
        </Link>
      </div>
    </div>
  );
};
