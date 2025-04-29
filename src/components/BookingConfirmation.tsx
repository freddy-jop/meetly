'use client';

import { Button } from '@/components/ui/button';
import { VisitorType } from '@/lib/types';
import { Appointment } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * @component BookingConfirmation
 * @description Affiche la confirmation de réservation pour un visiteur après la prise de rendez-vous.
 * @param {VisitorType} visitor - Le nom du visiteur utilisé pour rechercher la réservation prise.
 */
export const BookingConfirmation = ({ visitor }: VisitorType) => {
  const router = useRouter(); // Initialisation du hook de navigation
  const [booking, setBooking] = useState<Appointment | null>(null);

  // useEffect qui va chercher la dernière réservation effectuée pour le visiteur avec api/book
  useEffect(() => {
    const fetchLastBooking = async () => {
      try {
        const res = await axios.get('/api/book', {
          params: {
            visitor: visitor,
          },
        });
        const data = res.data ?? null;
        setBooking(data);
      } catch (error) {
        setBooking(null);
        throw error;
      }
    };

    fetchLastBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si aucun rendez-vous trouvé, affichage d'un message + bouton de retour
  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-lg font-semibold text-gray-800">Aucun rendez-vous trouvé.</p>
        <Button
          className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-[12px] font-semibold cursor-pointer text-white shadow-lg shadow-indigo-400/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
          onClick={() => router.push('/')}
        >
          Retour à l’accueil
        </Button>
      </div>
    );
  }

  const bookingDate = new Date(booking.date); // Conversion de la date de la réservation pour affichage

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-500">Merci ! 🎉</h1>
      <p className="text-lg text-gray-500">Ton rendez-vous est confirmé !</p>

      {/* Carte d'informations du rendez-vous */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md space-y-4">
        <p>
          <span className="font-semibold text-gray-800">
            <strong>Nom :</strong> {booking.visitorName}
          </span>
        </p>
        <p>
          <span className="font-semibold text-gray-800">
            <strong>Email :</strong> {booking.visitorEmail}
          </span>
        </p>
        <p>
          <span className="font-semibold text-gray-800">
            <strong>Date :</strong> {format(bookingDate, 'yyyy-MM-dd HH:mm:ss')}
          </span>
        </p>
      </div>

      <Button
        className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-[12px] font-semibold cursor-pointer text-white shadow-lg shadow-indigo-400/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
        onClick={() => router.push('/')}
      >
        Retour à l’accueil
      </Button>
    </div>
  );
};
