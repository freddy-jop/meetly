import { DashboardSection } from '@/components/DashboardSection';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <LandingNavbar session={session} />
      <DashboardSection username={session.user.name} />
    </>
  );
}
