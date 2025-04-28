import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Créer un compte</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
