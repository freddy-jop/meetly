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

export const AvailabilityItem = ({ availability }: { availability: Availability }) => {
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
      <li className="border p-4 rounded flex justify-between items-center">
        <AvailabilityEditForm
          initialValues={AvailabilityParseValues.data}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className="border p-4 rounded flex justify-between items-center">
      <div className="flex flex-wrap gap-4 items-end text-sm text-muted-foreground">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-muted-foreground mb-1">Jour de la semaine</label>
          <div className="px-3 py-2 border rounded bg-gray-200 text-foreground">
            {getDayName(Number(availability.dayOfWeek))}
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-muted-foreground mb-1">Heure de début</label>
          <div className="px-3 py-2 border rounded bg-gray-200 text-foreground">{availability.startTime}</div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-muted-foreground mb-1">Heure de fin</label>
          <div className="px-3 py-2 border rounded bg-gray-200 text-foreground">{availability.endTime}</div>
        </div>
      </div>
      <div className="flex gap-2 mt-5">
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
};
