'use client';

import AvailabilityItem from '@/components/AvailabilityEditItem';
import { useAvailabilityStore } from '@/store/availability.store';
import { Availability } from '@prisma/client';
import { useShallow } from 'zustand/react/shallow';

export const AvailabilityList = () => {
  const availabilityList = useAvailabilityStore(useShallow((state) => state.availabilityList));

  if (!availabilityList) return <p>Chargement des disponibilités en cours...</p>;

  return (
    <ul className="space-y-3">
      {availabilityList.map((availability: Availability) => (
        <AvailabilityItem key={availability.id} availability={availability} />
      ))}
    </ul>
  );
};
