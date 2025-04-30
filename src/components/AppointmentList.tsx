/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AppointmentList = () => {
  const { data, isPending } = useQuery({
    queryKey: ['appointments'],
    enabled: true,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const result = await axios.get('/api/appointments');
        return result.data;
      } catch (err) {
        const error = err as Error;
        toast.error(`Error Appointments: ${error.message}`);
        throw err; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });

  if (isPending) return <p>Chargement...</p>;

  return (
    <ul className="space-y-2">
      {data.map((appt: any) => (
        <li key={appt.id} className="border p-4 rounded-lg shadow-sm bg-background flex justify-between items-center">
          <div className="font-bold text-white rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 p-2 pr-8 pl-8">
            {appt.visitorName}
          </div>
          <div className="text-md text-muted-foreground">
            {new Date(appt.date).toLocaleString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </li>
      ))}
    </ul>
  );
};
