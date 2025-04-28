import { prisma } from '@/auth/prisma';
import { Availability } from '@prisma/client';

export const deletedCurrentAvailability = async (availabilityToDeleted: Availability) => {
  const deletedAvailability = await prisma.availability.delete({
    where: {
      id: availabilityToDeleted.id,
    },
  });
  if (!deletedAvailability) {
    return availabilityToDeleted;
  }
  return deletedAvailability;
};
