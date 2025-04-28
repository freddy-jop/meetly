import { prisma } from '@/auth/prisma';
import { addMinutes, format, isBefore } from 'date-fns';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userName = searchParams.get('user');
  const dateStr = searchParams.get('date'); // yyyy-mm-dd

  if (!userName || !dateStr) {
    return new NextResponse('Missing user or date', { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { name: userName } });

  if (!user) {
    return new Response('User is missing', { status: 400 });
  }

  const date = new Date(dateStr);
  const dayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)

  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        userId: user.id,
        dayOfWeek: Number(dayOfWeek),
      },
    });

    const takenAppointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        date: {
          gte: new Date(dateStr + 'T00:00:00'),
          lt: new Date(dateStr + 'T23:59:59'),
        },
      },
    });

    const takenTimes = takenAppointments.map((a) => format(new Date(a.date), 'HH:mm'));
    const availableSlots: string[] = [];

    for (const slot of availabilities) {
      let current = slot.startTime;

      while (current < slot.endTime) {
        const [hours, minutes] = current.split(':').map(Number);
        const slotDate = new Date(date);
        slotDate.setHours(hours, minutes, 0, 0);

        const formatted = format(slotDate, 'HH:mm');

        if (!takenTimes.includes(formatted) && isBefore(new Date(), slotDate)) {
          availableSlots.push(formatted);
        }

        // avance de 30 min
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
