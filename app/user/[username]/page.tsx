import { VisitorCalendar } from '@/components/VisitorCalendar';
import { PageParams } from '@/lib/types';

export default async function PublicBookingPage({ params }: PageParams<{ username: string }>) {
  const { username } = await params;
  return (
    <main className="max-w-3xl w-full mx-auto">
      <h1 className="text-3xl font-bold flex flex-col items-center justify-center gap-2">
        <span>Prendre rendez-vous avec</span>
        <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-sm font-semibold cursor-pointer text-white shadow-lg shadow-indigo-400/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg">
          {username}
        </span>
      </h1>
      <VisitorCalendar username={username} />
    </main>
  );
}
