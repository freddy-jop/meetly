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

export default function LoginForm() {
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
            onRequest: (ctx) => {
              console.log('loading :::: ', ctx);
              //show loading
            },
            onSuccess: (ctx) => {
              //redirect to the dashboard or sign in page
              toast.success(`Registration is successed with ${ctx.data}`);
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
      className="space-y-4"
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
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} disabled={isPendingLogin} />
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
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input type="password" {...field} disabled={isPendingLogin} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="w-full" disabled={isPendingLogin}>
        {isPendingLogin ? 'Connexion...' : 'Se connecter'}
      </Button>
    </Form>
  );
}
