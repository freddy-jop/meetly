import { AppointmentList } from '@/components/AppointmentList';
import { AvailabilityForm } from '@/components/AvailabilityForm';
import { AvailabilityList } from '@/components/AvailabilityList';
import { UserNameType } from '@/lib/types';

export const DashboardSection = ({ username }: UserNameType) => {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10 mt-10">
      <h1 className="text-3xl font-bold text-center">Tableau de bord</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Ajouter des disponibilités</h2>
        <AvailabilityForm username={username} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vos créneaux disponibles</h2>
        <AvailabilityList />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vos rendez-vous pris</h2>
        <AppointmentList />
      </section>
    </main>
  );
};
