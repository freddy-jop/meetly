import VisitorCalendar from '@/components/VisitorCalendar';

interface Props {
  params: { username: string };
}

export default function PublicBookingPage({ params }: Props) {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Prendre rendez-vous avec {params.username}</h1>
      <VisitorCalendar username={params.username} />
    </main>
  );
}
