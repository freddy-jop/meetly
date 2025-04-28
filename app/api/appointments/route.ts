import { prisma } from '@/auth/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session || !session?.user) {
    return new NextResponse('Unauthorised', { status: 401 });
  }

  const userId = session.user.id;

  const appointments = await prisma.appointment.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: 'desc',
    },
  });

  if (!appointments) {
    return NextResponse.json({ error: 'Pas de rendez vous' }, { status: 404 });
  }

  return NextResponse.json(appointments);
}
