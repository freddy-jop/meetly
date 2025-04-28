import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full p-8 shadow-xl rounded-2xl bg-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Créer un compte</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
