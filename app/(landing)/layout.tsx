import { RouteLayoutType } from '@/lib/types';

export default async function RouteLayout({ children }: RouteLayoutType) {
  return (
    <main className="min-h-screen bg-blue-50">
      <div className="flex min-h-screen flex-col bg-cover bg-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">{children}</div>
      </div>
    </main>
  );
}
