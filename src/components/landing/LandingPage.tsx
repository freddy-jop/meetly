'use client';

import { LandingHero } from '@/components/landing/LandingHero';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

export const LandingPage = () => {
  return (
    <div>
      <LandingNavbar />
      <LandingHero />
    </div>
  );
};
