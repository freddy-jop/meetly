'use client';

import { Button } from '@/components/ui/button';
import { VisitorType } from '@/lib/types';
import { Appointment } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const BookingConfirmation = ({ visitor }: VisitorType) => {
  const router = useRouter();
  const [booking, setBooking] = useState<Appointment | null>(null);

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

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-lg font-semibold">Aucun rendez-vous trouvé.</p>
        <Button onClick={() => router.push('/')}>Retour à l’accueil</Button>
      </div>
    );
  }

  const bookingDate = new Date(booking.date);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4 text-center">
      <h1 className="text-3xl font-bold">Merci ! 🎉</h1>
      <p className="text-lg">Ton rendez-vous est confirmé !</p>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md space-y-4">
        <p>
          <strong>Nom :</strong> {booking.visitorName}
        </p>
        <p>
          <strong>Email :</strong> {booking.visitorEmail}
        </p>
        <p>
          <strong>Date :</strong> {format(bookingDate, 'yyyy-MM-dd HH:mm:ss')}
        </p>
      </div>

      <Button onClick={() => router.push('/')}>Retour à l’accueil</Button>
    </div>
  );
};
