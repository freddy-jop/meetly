'use client';

import { TimeSlots } from '@/components/TimeSlots';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { calendarClasses } from '@/lib/calendarClasses';
import { Form } from '@/lib/Form';
import { UserNameType } from '@/lib/types';
import { BookingSchema, BookingType } from '@/schema/booking.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Availability } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format, isBefore } from 'date-fns';
import { CalendarCheck, CalendarPlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/src/style.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

/**
 * @component BookingConfirmation
 * @description Composant permettant aux utilisateurs de sélectionner une date et un créneau horaire pour réserver un rendez-vous.
 * Affiche un calendrier avec les jours disponibles.
 * Un formulaire pour collecter les informations de l'utilisateur,
 * Gestion de la soumission des réservations via une API `/api/book`.
 *
 * @param username - Nom d'utilisateur identifiant la personne dont les disponibilités sont affichées.
 * @returns JSX.Element - Interface de réservation avec calendrier `react-day-picker` et formulaire `react-hook-form` avec `zod`.
 *
 * @remarks
 * - Utilise `react-day-picker` pour le calendrier, `react-hook-form` avec `zod` pour la validation du formulaire.
 * - `react-query` pour les requêtes API, récupérant les créneaux horaires disponible via `/api/slots`.
 * - Gestion des erreurs avec des notifications via `react-hot-toast`.
 *
 * @example
 * ```tsx
 * <VisitorCalendar username="john_doe" />
 * ```
 */
export const VisitorCalendar = ({ username }: UserNameType) => {
  const router = useRouter();
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const form = useForm<BookingType>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: '',
      email: '',
      date: '',
    },
  });

  const { watch, setValue } = form;
  const emailValue = watch('email'); // On observe emailValue via watch

  useEffect(() => {
    //Si l'email est valide, extrait la partie avant @ pour remplir le champ name.
    if (emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      const [usernamePart] = emailValue.split('@');
      setValue('name', usernamePart, { shouldValidate: true });
    } else {
      setValue('name', '');
    }
  }, [emailValue, setValue]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        // axios.get pour Fetch les jours disponibles
        const res = await axios.get('/api/availability', {
          params: {
            username: username,
          },
        });
        const data = res.data ?? [];
        setAvailabilities(data);
      } catch (error) {
        console.error(error);
        setAvailabilities([]);
      }
    };

    fetchAvailability();
  }, [username]);

  const availableDays = Array.from(new Set(availabilities.map((a) => a.dayOfWeek)));

  const isDayAvailable = (date: Date) => {
    return availableDays.includes(date.getDay());
  };

  const { data: slotsData } = useQuery({
    queryKey: ['slots', username, selectedDate?.toISOString()],
    queryFn: async () => {
      if (!selectedDate) return { slots: [] };
      // axios.get fetch slots
      const res = await axios.get('/api/slots', {
        params: {
          user: username,
          date: format(selectedDate, 'yyyy-MM-dd'),
        },
      });
      const data = res.data ?? [];
      return data;
    },
    enabled: !!selectedDate,
  });

  // Recupération des slots
  const slots = slotsData?.slots || [];

  const handleSubmit = async (values: BookingType) => {
    try {
      if (!selectedDate) {
        toast.error('Sélectionne un jour disponible !');
        return;
      }

      const [hour, minute] = values.date.split(':').map(Number);
      const bookingDate = new Date(selectedDate);
      bookingDate.setHours(hour, minute, 0, 0);

      const body = {
        name: values.name,
        email: values.email,
        date: bookingDate,
      };
      const res = await axios.post('/api/book', body, {
        params: {
          username: username,
        },
      });
      const data = res.data;
      if (data) {
        toast.success('Rendez-vous confirmé !');
        router.push(`/confirmation/${data.visitorName}`);
      }
    } catch (error) {
      toast.error('Erreur lors de la réservation.');
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center px-6 py-8 space-y-6 bg-white shadow-xl rounded-2xl mt-5">
        <DayPicker
          classNames={calendarClasses}
          selected={selectedDate}
          onSelect={setSelectedDate}
          mode="single"
          modifiers={{
            available: isDayAvailable,
            weekend: (date) => [0, 6].includes(date.getDay()), // Dimanche/Samedi
          }}
          modifiersClassNames={{
            available: calendarClasses.available, // Jours disponibles en bleu
            selected: calendarClasses.selected, // Date sélectionnée en bleu plein
            today: calendarClasses.today, // Aujourd'hui en rouge
            weekend: calendarClasses.weekend, // Weekend en gris
            disabled: calendarClasses.disabled, // bloqué les disponibilité des dates passées
          }}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Ignore l'heure pour comparaison
            return (
              isBefore(date, today) || // Bloque toutes les dates passées
              !isDayAvailable(date) // Bloque les jours non disponibles
            );
          }}
        />
      </div>

      {selectedDate && (
        <div className="px-6 py-8 space-y-6 bg-white shadow-xl rounded-2xl mt-5">
          <div className="border-b border-gray-200 pb-4 flex items-center justify-center gap-5">
            <CalendarPlus2 className="size-8" />
            <h2 className="text-2xl font-semibold text-gray-800">
              {new Date(selectedDate).toLocaleString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h2>
          </div>
          <Form
            className="space-y-6"
            form={form}
            onSubmit={async (values) => {
              await handleSubmit(values);
            }}
          >
            {/* Champ name désactivé (pré-rempli à partir de l'email). */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="Votre email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Créneau horaire</FormLabel>
                  <FormControl>
                    <TimeSlots
                      slots={slots} // Utilisation de la liste des créneaux récupérés
                      onSelect={(date) => field.onChange(date)}
                      selectedTime={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <CalendarCheck className="size-5 mr-2" />
              <span className="font-semibold">Confirmer le rendez-vous</span>
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};
