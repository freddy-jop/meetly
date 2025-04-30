'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

// Create a client
const queryClient = new QueryClient();

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-cover bg-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-center" />
            {props.children}
          </QueryClientProvider>
        </div>
      </div>
    </main>
  );
};
