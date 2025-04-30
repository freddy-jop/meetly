import { AppointmentList } from '@/components/AppointmentList';
import { AvailabilityForm } from '@/components/AvailabilityForm';
import { AvailabilityList } from '@/components/AvailabilityList';
import { Button } from '@/components/ui/button';
import { getServerUrl } from '@/lib/get-server-url';
import { UserNameType } from '@/lib/types';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';

export const DashboardSection = ({ username }: UserNameType) => {
  const baseUrl = new URL(getServerUrl());
  return (
    <main className="w-full max-w-5xl mx-auto p-6 space-y-10 mt-10">
      <h1 className="text-3xl font-bold text-center">Tableau de bord</h1>

      <section className="space-y-4 flex items-center justify-center">
        <Link href={`${baseUrl}user/${username}`}>
          <Button
            variant="default"
            className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-[12px] font-semibold cursor-pointer text-white shadow-lg shadow-indigo-400/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
          >
            <CalendarDays className="size-5 mr-3" />
            {`${baseUrl}user/${username}`}
          </Button>
        </Link>
      </section>

      <section className="bg-white shadow-xl rounded-2xl px-6 py-8 mx-auto space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Ajouter des disponibilités</h2>
        </div>
        <AvailabilityForm username={username} />
      </section>

      <section className="bg-white shadow-xl rounded-2xl px-6 py-8 mx-auto space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Vos créneaux disponibles</h2>
        </div>
        <AvailabilityList />
      </section>

      <section className="bg-white shadow-xl rounded-2xl px-6 py-8 mx-auto space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Vos rendez-vous pris</h2>
        </div>
        <AppointmentList />
      </section>
    </main>
  );
};
