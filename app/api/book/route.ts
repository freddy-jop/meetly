import { prisma } from '@/auth/prisma';
import { BookingSchema } from '@/schema/booking.schema';
import { NextResponse } from 'next/server';

/**
 * @function POST
 * @description Permet de créer une réservation (appointment) pour un utilisateur.
 * @param {Request} req - Contient les informations de réservation.
 * @returns {Promise<NextResponse>} On retourne la réservation créée ou une erreur.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = BookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
  }

  // Récupération du paramètre 'username' depuis l'URL
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  const { name, email, date } = parsed.data; // Déstructuration des informations validées

  if (!username) {
    return new NextResponse('Missing UserName', { status: 400 });
  }

  // Recherche de l'utilisateur correspondant dans la base de données
  const user = await prisma.user.findUnique({ where: { name: username } });

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  const dateObj = new Date(date); // Conversion de la date string en objet Date

  // Vérification si pour un rendez-vous le créneau est déjà pris
  const exists = await prisma.appointment.findFirst({
    where: { userId: user.id, date: dateObj },
  });

  if (exists) {
    return NextResponse.json({ error: 'Créneau déjà réservé' }, { status: 409 });
  }

  // Création d'un nouveau rendez-vous (appointment) dans la base de données
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

/**
 * @function GET
 * @description Permet de récupérer la dernière réservation effectuée par un visiteur donné.
 * @param {Request} request - Requête contenant le nom du visiteur en paramètre.
 * @returns {Promise<NextResponse>} On retourne la dernière réservation ou une erreur.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const visitor = searchParams.get('visitor');

  if (!visitor) {
    return new NextResponse('visitorNmate not Found', { status: 401 });
  }

  // Recherche de la dernière réservation du visiteur (triée par date les plus récentes)
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
