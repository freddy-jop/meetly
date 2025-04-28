'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Form } from '@/lib/Form';
import { LoginSchema, LoginType } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isPending: isPendingLogin, mutate: processLogin } = useMutation({
    mutationFn: async (form: LoginType) => {
      try {
        await authClient.signIn.email(
          {
            email: form.email, // user email address
            password: form.password, // user password -> min 8 characters by default
          },
          {
            onSuccess: () => {
              toast.success('Connexion réussie, redirection en cours...'); //redirect to the dashboard page
              router.push('/dashboard');
            },
            onError: (ctx) => {
              toast.error(ctx.error.message); // display the error message
            },
          },
        );
      } catch (err) {
        const error = err as AxiosError;
        throw error; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });

  return (
    <Form
      className="space-y-6"
      form={form}
      onSubmit={async (values) => {
        await processLogin(values);
      }}
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                {...field}
                disabled={isPendingLogin}
                className="rounded-lg text-gray-700 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Mot de passe</FormLabel>
            <FormControl>
              <Input
                type="password"
                {...field}
                disabled={isPendingLogin}
                className="rounded-lg text-gray-700 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
        disabled={isPendingLogin}
      >
        {isPendingLogin ? 'Connexion...' : 'Se connecter'}
      </Button>
    </Form>
  );
};
