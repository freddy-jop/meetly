import { RegisterForm } from '@/components/RegisterForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session && session.user) {
    redirect('/dashboard');
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full p-8 shadow-xl rounded-2xl bg-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Créer un compte</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
