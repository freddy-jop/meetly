'use client';

import { TimeSlots } from '@/components/TimeSlots';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Form } from '@/lib/Form';
import { UserNameType } from '@/lib/types';
import { BookingSchema, BookingType } from '@/schema/booking.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Availability } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format, isBefore } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function VisitorCalendar({ username }: UserNameType) {
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
  const emailValue = watch('email');

  useEffect(() => {
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

  function isDayAvailable(date: Date) {
    return availableDays.includes(date.getDay());
  }

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

  async function handleSubmit(values: BookingType) {
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
  }

  return (
    <div className="space-y-6">
      <DayPicker
        selected={selectedDate}
        onSelect={setSelectedDate}
        mode="single"
        modifiers={{
          available: isDayAvailable,
          weekend: (date) => [0, 6].includes(date.getDay()), // Dimanche/Samedi
        }}
        modifiersClassNames={{
          available: 'font-bold text-blue-600', // Jours disponibles en bleu
          selected: 'font-bold text-white bg-blue-600 rounded-full', // Date sélectionnée en bleu plein
          today: 'text-red-500 font-bold', // Aujourd'hui en rouge
          weekend: 'text-indigo-600', // Weekend en gris
        }}
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Ignore l'heure pour comparaison
          return (
            isBefore(date, today) || // Bloque toutes les dates passées
            !isDayAvailable(date) // Bloque les jours non disponibles
          );
        }}
        styles={{
          caption: { fontWeight: 'bold', fontSize: '1.25rem' }, // Titre mois/année
          head_cell: { fontWeight: 'bold', color: '#555' }, // Noms des jours (Lun, Mar, ...)
          cell: { padding: '0.75rem' }, // Cellule jour
        }}
      />

      {selectedDate && (
        <Form
          className="space-y-6"
          form={form}
          onSubmit={async (values) => {
            await handleSubmit(values);
          }}
        >
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
                    userId={username ?? ''}
                    date={format(selectedDate, 'yyyy-MM-dd')}
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
            Confirmer le rendez-vous
          </Button>
        </Form>
      )}
    </div>
  );
}
