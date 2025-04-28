import { prisma } from '@/auth/prisma';
import { auth } from '@/lib/auth';
import { AvailabilitySchema } from '@/schema/availability.schema';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

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
      dayOfWeek: Number(dayOfWeek),
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('username');

  console.log('userName::::: ', userName);

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
