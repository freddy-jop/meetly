import { LoginForm } from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full p-8 shadow-xl rounded-2xl bg-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Connexion</h1>
        <LoginForm />
        {/* Footer */}
        <div className="mt-6 flex items-center justify-center">
          <p className="text-gray-600">
            Pas encore de compte ?{' '}
            <Link href="/signup" className="text-indigo-600 hover:underline font-semibold">
              Inscription
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
