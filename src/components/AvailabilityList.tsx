'use client';

import { AvailabilityItem } from '@/components/AvailabilityEditItem';
import { useAvailabilityStore } from '@/store/availability.store';
import { Availability } from '@prisma/client';
import { useShallow } from 'zustand/react/shallow';

export const AvailabilityList = () => {
  const availabilityList = useAvailabilityStore(useShallow((state) => state.availabilityList));

  if (!availabilityList.length)
    return (
      <div className="flex items-center justify-center text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        Aucune disponibilité pour le moment.
      </div>
    );

  return (
    <ul className="space-y-3">
      {availabilityList.map((availability: Availability) => (
        <AvailabilityItem key={availability.id} availability={availability} />
      ))}
    </ul>
  );
};
