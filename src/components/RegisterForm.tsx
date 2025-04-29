'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Form } from '@/lib/Form';
import { RegisterSchema, RegisterType } from '@/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const { watch, setValue } = form;
  const emailValue = watch('email');

  useEffect(() => {
    if (emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      const [usernamePart] = emailValue.split('@');
      setValue('username', usernamePart, { shouldValidate: true });
    } else {
      setValue('username', '');
    }
  }, [emailValue, setValue]);

  const { isPending: isPendingRegistration, mutate: processRegistration } = useMutation({
    mutationFn: async (form: RegisterType) => {
      try {
        await authClient.signUp.email(
          {
            email: form.email, // user email address
            password: form.password, // user password -> min 8 characters by default
            name: form.username, // user display name
          },
          {
            onSuccess: () => {
              //redirect to the dashboard or sign in page
              toast.success(`Inscritption réussie, redirection en cours...`);
              router.push('/dashboard');
            },
            onError: (ctx) => {
              // display the error message
              toast.error(ctx.error.message);
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
        await processRegistration(values);
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
                {...field}
                disabled={isPendingRegistration}
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Nom d’utilisateur</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled
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
                disabled={isPendingRegistration}
                className="rounded-lg text-gray-700 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        disabled={isPendingRegistration}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
      >
        {isPendingRegistration ? 'Création...' : 'Créer le compte'}
      </Button>
    </Form>
  );
}
