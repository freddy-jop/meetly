import { prisma } from '@/auth/prisma';
import { auth } from '@/lib/auth'; //Fonction d'authentification
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * @function GET
 * @description Récupération des rendez-vous de l'utilisateur connecté.
 * Authentification de session pour sécuriser la requête.
 *
 * @returns {Promise<NextResponse>} Récupération de la liste des rendez-vous ou un message d'erreur.
 */
export async function GET() {
  // Récupération de la session utilisateur en passant les en-têtes HTTP
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session || !session?.user) {
    return new NextResponse('Unauthorised', { status: 401 });
  }

  const userId = session.user.id;

  // Recherche de tous les rendez-vous associés à cet utilisateur
  const appointments = await prisma.appointment.findMany({
    where: {
      userId: userId, // Filtrer par l'utilisateur connecté
    },
    orderBy: {
      date: 'desc', // Trier par date décroissante (les plus récents en premier)
    },
  });

  if (!appointments) {
    return NextResponse.json({ error: 'Pas de rendez vous' }, { status: 404 });
  }

  return NextResponse.json(appointments);
}
