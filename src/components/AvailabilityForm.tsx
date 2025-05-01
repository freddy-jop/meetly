'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form } from '@/lib/Form';
import { UserNameType } from '@/lib/types';
import { AvailabilitySchema, AvailabilityType } from '@/schema/availability.schema';
import {
  setAvailabilitiesAndDisabledDays,
  updateAvailabilitiesAndDisabledDays,
  useAvailabilityStore,
} from '@/store/availability.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Availability } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

/**
 * @component AvailabilityForm
 * @description Formulaire permettant d'ajouter des créneaux de disponibilités pour un utilisateur donné.
 * @param {UserNameType} username - L'identifiant (username) de l'utilisateur connecté.
 */
export const AvailabilityForm = ({ username }: UserNameType) => {
  // Accès aux jours désactivés pour gérer les disponibilités d'un utilisateur
  const disabledDays = useAvailabilityStore(useShallow((state) => state.disabledDays));

  const setCheckAvailabilityList = useAvailabilityStore(useShallow((state) => state.setCheckAvailabilityList));
  const checkAvailabilityList = useAvailabilityStore(useShallow((state) => state.checkAvailabilityList));

  // Initialisation du formulaire avec react-hook-form + schéma zod/Types
  const form = useForm<AvailabilityType>({
    resolver: zodResolver(AvailabilitySchema),
    defaultValues: {
      dayOfWeek: '',
      startTime: '',
      endTime: '',
    },
  });

  useQuery({
    queryKey: ['availability', String(checkAvailabilityList)],
    enabled: checkAvailabilityList,
    queryFn: async () => {
      try {
        const result = await axios.get('/api/availability', {
          params: {
            username: username,
          },
        });
        const data: Array<Availability> = result.data;
        if (data) {
          setCheckAvailabilityList(false);
          setAvailabilitiesAndDisabledDays(data);
        }
      } catch (err) {
        const error = err as Error;
        setAvailabilitiesAndDisabledDays([]);
        toast.error(`Error Appointments: ${error.message}`);
        throw err; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });

  const onSubmit = async (data: AvailabilityType) => {
    try {
      const res = await axios.post('/api/availability', data);

      const availabilityUpdated: Availability = res.data ?? [];
      // Mise à jour du store Zustand avec la nouvelle disponibilité
      updateAvailabilitiesAndDisabledDays([availabilityUpdated]);
      toast.success('Créneau ajouté.');
      form.reset();
    } catch (error) {
      toast.error('Impossible d&aposajouter ce creneau.');
      throw error;
    }
  };

  return (
    <Form
      className="space-y-4"
      form={form}
      disabled={disabledDays.length >= 7} // Désactive tout le form si les 7 jours sont pris
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      {/* Sélection du jour de la semaine */}
      <FormField
        control={form.control}
        name="dayOfWeek"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-xs font-medium text-muted-foreground mb-1">Jour de la semaine</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={String(field.value)}
              disabled={disabledDays.length >= 7} // Tous les jours sont pris
            >
              <SelectTrigger className="w-full rounded-lg text-gray-700 border-gray-300 shadow-md focus:ring-2 hover:focus:ring-blue-500 hover:focus:border-blue-500">
                <SelectValue placeholder="Choisir un jour" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: '0', label: 'Dimanche' },
                  { value: '1', label: 'Lundi' },
                  { value: '2', label: 'Mardi' },
                  { value: '3', label: 'Mercredi' },
                  { value: '4', label: 'Jeudi' },
                  { value: '5', label: 'Vendredi' },
                  { value: '6', label: 'Samedi' },
                ].map((day) => (
                  <SelectItem
                    key={day.value}
                    value={day.value}
                    disabled={disabledDays.includes(Number(day.value))} // Désactive si déjà pris
                  >
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Champs pour définir heure de début et heure de fin */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-xs font-medium text-muted-foreground mb-1">Heure de début</FormLabel>
              <FormControl>
                <Input
                  placeholder="09:00"
                  {...field}
                  type="time"
                  className="rounded-lg text-gray-700 border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-xs font-medium text-muted-foreground mb-1">Heure de fin</FormLabel>
              <FormControl>
                <Input
                  placeholder="10:00"
                  {...field}
                  type="time"
                  className="rounded-lg text-gray-700 border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        <Plus className="size-5 sm:mr-2" />
        Ajouter une disponibilité
      </Button>
    </Form>
  );
};
