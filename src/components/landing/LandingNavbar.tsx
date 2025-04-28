/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const LandingNavbar = ({ session }: any) => {
  const router = useRouter();

  const logoutAction = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/'); // redirect to Home page
          },
        },
      });
    } catch (err) {
      throw err; // Propagation de l'erreur pour que React Query la prenne en compte
    }
  };
  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-white/80 p-4 shadow-md backdrop-blur-md">
      <Link href="/" className="flex items-center space-x-3">
        <div className="relative mr-4">
          <Image
            priority
            src="/images/meetly_logo.png"
            alt="Meetly"
            width={150}
            height={40}
            className="object-contain"
          />
        </div>
      </Link>

      {/* Bouton */}
      {!session ? (
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button
              size="lg"
              variant="default"
              className="rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110 sm:text-base"
            >
              Admin Page
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Button
            size="lg"
            variant="default"
            onClick={() => logoutAction()}
            className="rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110 sm:text-base"
          >
            LogOut
          </Button>
        </div>
      )}
    </nav>
  );
};
