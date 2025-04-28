import VisitorCalendar from '@/components/VisitorCalendar';
import { PageParams } from '@/lib/types';

export default async function PublicBookingPage({ params }: PageParams<{ username: string }>) {
  const { username } = await params;
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Prendre rendez-vous avec {username}</h1>
      <VisitorCalendar username={username} />
    </main>
  );
}
