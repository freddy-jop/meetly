'use client';

import { AvailabilityEditForm } from '@/components/AvailabilityEditForm';
import { Button } from '@/components/ui/button';
import { getDayName } from '@/lib/getDayName';
import { AvailabilitySchema, AvailabilityType } from '@/schema/availability.schema';
import { deleteAvailabilitiesAndDisabledDays, updateAvailabilitiesAndDisabledDays } from '@/store/availability.store';
import { Availability } from '@prisma/client';
import axios from 'axios';
import { CalendarOff, PencilLine } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AvailabilityItem({ availability }: { availability: Availability }) {
  const [editing, setEditing] = useState(false);
  const AvailabilityParseValues = AvailabilitySchema.safeParse({
    ...availability,
    dayOfWeek: String(availability.dayOfWeek),
  });

  const handleUpdate = async (updatedData: AvailabilityType) => {
    try {
      const res = await axios.put(`/api/availability`, updatedData, {
        params: {
          availabilityId: availability.id,
        },
      });
      const data: Availability = res.data ?? [];
      setEditing(false);
      updateAvailabilitiesAndDisabledDays([data]);
    } catch (error) {
      //console.error(error);
      throw error;
    }
  };

  const deleteAvailability = async (availabilityId: string) => {
    try {
      const res = await axios.delete(`/api/availability`, {
        params: {
          availabilityId: availabilityId,
        },
      });
      const data: Availability = res.data ?? [];
      deleteAvailabilitiesAndDisabledDays([data]);
      toast.success(`Disponibilté ${availabilityId} supprimé !`);
    } catch (error) {
      //console.error(error);
      toast.success(`Disponibilité non trouvé !`);
      throw error;
    }
  };

  if (editing && AvailabilityParseValues.data && AvailabilityParseValues.success) {
    return (
      <AvailabilityEditForm
        initialValues={AvailabilityParseValues.data}
        onSubmit={handleUpdate}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <li className="border p-4 rounded flex justify-between items-center">
      <div>{`${getDayName(Number(availability.dayOfWeek))} — ${availability.startTime} à ${availability.endTime}`}</div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditing(true)}>
          <PencilLine className="size-5" />
          Modifier
        </Button>
        <Button variant="outline" onClick={() => deleteAvailability(availability.id)}>
          <CalendarOff className="size-5" />
          Supprimer
        </Button>
      </div>
    </li>
  );
}
