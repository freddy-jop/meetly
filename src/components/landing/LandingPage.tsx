/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { LandingHero } from '@/components/landing/LandingHero';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

export const LandingPage = ({ session }: any) => {
  return (
    <div>
      <LandingNavbar session={session} />
      <LandingHero />
    </div>
  );
};
