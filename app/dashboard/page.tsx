import { AppointmentList } from '@/components/AppointmentList';
import { AvailabilityForm } from '@/components/AvailabilityForm';
import { AvailabilityList } from '@/components/AvailabilityList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) return <p>Chargement du Dasboard en cours...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ajouter des disponibilités</h2>
        <AvailabilityForm username={session.user.name} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Vos créneaux disponibles</h2>
        <AvailabilityList />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Vos rendez-vous pris</h2>
        <AppointmentList />
      </section>
    </main>
  );
}
