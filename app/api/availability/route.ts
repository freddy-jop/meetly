import { prisma } from '@/auth/prisma';
import { auth } from '@/lib/auth'; //Fonction d'authentification
import { AvailabilitySchema } from '@/schema/availability.schema';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * @function POST
 * @description Ajoute une nouvelle disponibilité pour l'utilisateur connecté.
 * @param {Request} request - Contient les données de disponibilité de l'utilisateur.
 * @returns {Promise<NextResponse>} On envoie la nouvelle disponibilité ou une erreur.
 */
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session || !session?.user) {
    return new NextResponse('Unauthorised', { status: 401 });
  }

  const body = await request.json();
  const result = AvailabilitySchema.safeParse(body);

  if (!result.success) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  const { dayOfWeek, startTime, endTime } = result.data;

  const availabilityList = await prisma.availability.create({
    data: {
      dayOfWeek: Number(dayOfWeek), // Conversion en entier dayOfWeek Int 0 - 6 (Sun - Sat)
      startTime: String(startTime),
      endTime: String(endTime),
      user: { connect: { id: session?.user.id } },
    },
  });

  if (!availabilityList) {
    return new NextResponse('Availabilities not found', { status: 404 });
  }

  return NextResponse.json(availabilityList, { status: 200 });
}

/**
 * @function PUT
 * @description Mise à jour d'une disponibilité existante pour l'utilisateur connecté.
 * @param {Request} request - La requête HTTP contient les données mises à jour.
 * @returns {Promise<NextResponse>} On Retourne la disponibilité mise à jour ou une erreur.
 */
export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session || !session?.user) {
    return new NextResponse('Unauthorised', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const availabilityId = searchParams.get('availabilityId');

  const body = await request.json();

  const result = AvailabilitySchema.safeParse(body);

  if (!result.success) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  if (!availabilityId) {
    return new NextResponse('availabilityId not found', { status: 404 });
  }

  const { dayOfWeek, startTime, endTime } = result.data;

  const updatedAvailability = await prisma.availability.update({
    where: { id: availabilityId, dayOfWeek: Number(dayOfWeek) },
    data: {
      startTime: String(startTime),
      endTime: String(endTime),
      user: { connect: { id: session?.user.id } },
    },
  });

  if (!updatedAvailability) {
    return new NextResponse(`Availability ${availabilityId} not Updated`, { status: 404 });
  }

  return NextResponse.json(updatedAvailability, { status: 200 });
}

/**
 * @function GET
 * @description Récupération de toutes les disponibilités d'un utilisateur donné.
 * @param {Request} request - La requête contenant username dans les paramètre d'url.
 * @returns {Promise<NextResponse>} Récupération de la liste des disponibilités ou une erreur.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('username');

  if (!userName) {
    return new NextResponse('userName not Found', { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { name: userName } });

  if (!user) {
    return new Response('User is missing', { status: 400 });
  }

  const availabilities = await prisma.availability.findMany({
    where: { userId: user.id },
  });

  if (!availabilities) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  return NextResponse.json(availabilities);
}

/**
 * @function DELETE
 * @description Suppression d'une disponibilité en envoyant son identifiant.
 * @param {Request} request - Request contenant l'identifiant de la disponibilité à supprimer.
 * @returns {Promise<NextResponse>} On récupère l'id de la disponibilité confirmant la suppression ou une erreur.
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const availabilityId = searchParams.get('availabilityId');

  if (!availabilityId) {
    return new NextResponse('availabilityId not Found', { status: 401 });
  }

  const deletedAvailability = await prisma.availability.delete({
    where: {
      id: availabilityId,
    },
  });

  if (!deletedAvailability) {
    return NextResponse.json({ error: 'Disponibilité non trouvé' }, { status: 404 });
  }

  return NextResponse.json(deletedAvailability);
}
