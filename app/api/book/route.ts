import { prisma } from '@/auth/prisma';
import { BookingSchema } from '@/schema/booking.schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = BookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  const { name, email, date } = parsed.data;

  if (!username) {
    return new NextResponse('Missing UserName', { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { name: username } });

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  const dateObj = new Date(date);

  // Vérifie si le créneau est déjà pris
  const exists = await prisma.appointment.findFirst({
    where: { userId: user.id, date: dateObj },
  });

  if (exists) {
    return NextResponse.json({ error: 'Créneau déjà réservé' }, { status: 409 });
  }

  // Création du rendez-vous
  const booking = await prisma.appointment.create({
    data: {
      visitorName: name,
      visitorEmail: email,
      date: dateObj,
      user: { connect: { id: user.id } },
    },
  });

  return NextResponse.json(booking, { status: 200 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const visitor = searchParams.get('visitor');

  if (!visitor) {
    return new NextResponse('visitorNmate not Found', { status: 401 });
  }

  const lastBooking = await prisma.appointment.findFirst({
    where: { visitorName: visitor },
    orderBy: {
      date: 'desc',
    },
  });

  if (!lastBooking) {
    return new Response('No Booking', { status: 400 });
  }

  return NextResponse.json(lastBooking);
}
