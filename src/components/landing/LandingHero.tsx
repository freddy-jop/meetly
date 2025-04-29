'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const LandingHero = () => {
  return (
    <div className="space-y-5 pt-48 text-center font-bold text-gray-800">
      {/* Slogan */}
      <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:text-4xl md:text-5xl">
        Schedule Smarter. Meet Better.
      </div>

      {/* Bouton principal */}
      <div>
        <Link href="/login">
          <Button
            variant="default"
            className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-[12px] font-semibold cursor-pointer text-white shadow-lg shadow-indigo-400/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
          >
            Go to Dashboard
          </Button>
        </Link>
      </div>

      {/* Section Demo User */}
      <div className="mt-20 space-y-6">
        <div className="text-sm font-light text-gray-700 sm:text-base md:text-lg">
          Vous pouvez tester l&apos;application avec l&apos;utilisateur de démonstration :
          <br />
          <span className="font-semibold text-gray-800">Email :</span> demo@meety.com
          <br />
          <span className="font-semibold text-gray-800">Mot de passe :</span> demomeetly
        </div>
        <Link href="/user/demo">
          <Button
            variant="secondary"
            className="rounded-full cursor-pointer bg-gradient-to-r from-green-400 to-emerald-500 p-4 text-[12px] font-semibold text-white shadow-lg shadow-emerald-400/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
          >
            Réservez un créneau en mode Démo!
          </Button>
        </Link>
      </div>

      {/* Section Workflow/Présentation */}
      <div className="mt-32 space-y-8 text-left text-gray-700 sm:px-10 md:px-20 lg:px-48">
        <h2 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">Comment fonctionne Meety ?</h2>
        <div className="space-y-4 text-sm md:text-lg">
          <p>
            <span className="font-semibold text-gray-800">Développer un système de prise de rendez-vous</span> similaire
            à Calendly, avec deux types d&apos;accès :
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold text-gray-800">Accès utilisateur :</span> paramétrez vos disponibilités via
              votre tableau de bord personnel.
            </li>
            <li>
              <span className="font-semibold text-gray-800">Accès visiteur :</span> visualisez les créneaux libres et
              prenez directement rendez-vous. Le créneau est automatiquement bloqué après la réservation.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
