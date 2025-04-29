import { prisma } from '@/auth/prisma';
import { addMinutes, format, isBefore } from 'date-fns'; //date-fns - Utilitaires de manipulationn de date
import { NextResponse } from 'next/server';

/**
 * @function GET
 * @description Cette fonction retourne les créneaux horaires disponibles pour un utilisateur donné à une date donnée.
 * @param {Request} req - La requête contenant les paramètres url `user` et `date`.
 * @returns {Promise<NextResponse>} On Retourne les créneaux disponibles avce increment de 30 minutes ou une erreur.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Extraction des paramètres de l'URL
  const userName = searchParams.get('user'); // Nom d'utilisateur à rechercher
  const dateStr = searchParams.get('date'); // Date au format 'yyyy-mm-dd'

  if (!userName || !dateStr) {
    return new NextResponse('Missing user or date', { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { name: userName } });

  if (!user) {
    return new Response('User is missing', { status: 400 });
  }

  const date = new Date(dateStr); // Conversion de la chaîne de date en objet Date
  const dayOfWeek = date.getDay(); // Extraction du jour de la semaine (0 = dimanche, 6 = samedi)

  try {
    // Récupération des disponibilités de l'utilisateur pour le jour de la semaine donné
    const availabilities = await prisma.availability.findMany({
      where: {
        userId: user.id,
        dayOfWeek: Number(dayOfWeek),
      },
    });

    // Récupération des rendez-vous déjà pris pour cette date
    const takenAppointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        date: {
          gte: new Date(dateStr + 'T00:00:00'), // De 00:00
          lt: new Date(dateStr + 'T23:59:59'), // jusqu'à 23:59
        },
      },
    });

    // Extraction des heures déjà prises sous forme de string "HH:mm"
    const takenTimes = takenAppointments.map((a) => format(new Date(a.date), 'HH:mm'));

    const availableSlots: string[] = []; // Initialisation du tableau des créneaux disponibles

    // Boucle sur chaque disponibilité pour générer les créneaux
    for (const slot of availabilities) {
      let current = slot.startTime; // Heure de départ du créneau

      // Boucle pour créer des créneaux de 30 minutes jusqu'à l'heure de fin
      while (current < slot.endTime) {
        // Transformation de l'heure actuelle en objet Date
        const [hours, minutes] = current.split(':').map(Number);
        const slotDate = new Date(date);
        slotDate.setHours(hours, minutes, 0, 0);

        // Formatage de l'heure du créneau en "HH:mm"
        const formatted = format(slotDate, 'HH:mm');

        // Vérification que :
        // 1. Le créneau n'est pas déjà pris
        // 2. Le créneau est dans le futur par rapport à maintenant
        if (!takenTimes.includes(formatted) && isBefore(new Date(), slotDate)) {
          availableSlots.push(formatted);
        }

        // Passage au créneau suivant en avance de 30 min
        const nextSlot = addMinutes(slotDate, 30);
        current = format(nextSlot, 'HH:mm');
      }
    }

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error('Error generating slots:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
