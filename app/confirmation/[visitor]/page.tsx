import { BookingConfirmation } from '@/components/BookingConfirmation';
import { PageParams } from '@/lib/types';

export default async function ConfirmationPage({ params }: PageParams<{ visitor: string }>) {
  const { visitor } = await params;
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 shadow-lg rounded-lg bg-white">
        <BookingConfirmation visitor={visitor} />
      </div>
    </main>
  );
}
