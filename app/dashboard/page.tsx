import { DashboardSection } from '@/components/DashboardSection';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) return <p>Chargement du Dasboard en cours...</p>;

  return (
    <>
      <LandingNavbar session={session} />
      <DashboardSection username={session.user.name} />
    </>
    // <main className="max-w-4xl mx-auto p-6 space-y-10">
    //   <h1 className="text-3xl font-bold text-center">Tableau de bord</h1>

    //   <section className="space-y-4">
    //     <h2 className="text-xl font-semibold mb-2">Ajouter des disponibilités</h2>
    //     <AvailabilityForm username={session.user.name} />
    //   </section>

    //   <section className="space-y-4">
    //     <h2 className="text-xl font-semibold">Vos créneaux disponibles</h2>
    //     <AvailabilityList />
    //   </section>

    //   <section className="space-y-4">
    //     <h2 className="text-xl font-semibold">Vos rendez-vous pris</h2>
    //     <AppointmentList />
    //   </section>
    // </main>
  );
}
