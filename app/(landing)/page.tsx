import { LandingPage } from '@/components/landing/LandingPage';
// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';
// import { redirect } from 'next/navigation';

export default async function RoutePage() {
  return <LandingPage />;
  // const session = await auth.api.getSession({
  //   headers: await headers(), // you need to pass the headers object.
  // });
  // if (!session) {
  //   return <LandingPage />;
  // }
  // if (session) {
  //   redirect('/dashboard');
  // }
}
