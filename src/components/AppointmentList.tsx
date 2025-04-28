/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AppointmentList = () => {
  const { data, isPending } = useQuery({
    queryKey: ['appointments'],
    enabled: true,
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
        <li key={appt.id} className="border p-2 rounded">
          {appt.visitorName} — {new Date(appt.date).toLocaleString()}
        </li>
      ))}
    </ul>
  );
};
