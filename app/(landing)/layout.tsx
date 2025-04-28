import { RouteLayoutType } from '@/lib/types';

export default async function RouteLayout({ children }: RouteLayoutType) {
  return (
    <main className="h-full overflow-auto bg-gray-900">
      <div className="h-full bg-cover bg-center">
        <div className="mx-auto size-full max-w-screen-xl">{children}</div>
      </div>
    </main>
  );
}
