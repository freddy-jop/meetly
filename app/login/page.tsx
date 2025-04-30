import { LoginForm } from '@/components/LoginForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session && session.user) {
    redirect('/dashboard');
  }
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 shadow-xl rounded-2xl bg-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Connexion</h1>
        <LoginForm />
        {/* Footer */}
        <div className="mt-6 flex items-center justify-center">
          <p className="text-gray-600">
            Pas encore de compte ?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
              Inscription
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
