import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Connexion</h1>
        <LoginForm />
        {/* Footer */}
        <div className="mt-6 flex items-center justify-center">
          <Link href="/register">
            <Button
              variant="default"
              className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-4 text-[12px] font-semibold shadow-lg shadow-indigo-500/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
            >
              Inscription
            </Button>
            {/* <p className="text-gray-600 transition hover:text-blue-500 flex items-center justify-center">Inscription</p> */}
          </Link>
        </div>
      </div>
    </main>
  );
}
