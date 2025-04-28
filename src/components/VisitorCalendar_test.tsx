/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format, setHours, setMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-hot-toast';

interface Props {
  username: string;
}

export default function VisitorCalendar({ username }: Props) {
  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [visitor, setVisitor] = useState({ name: '', email: '' });

  useEffect(() => {
    fetch(`/api/availability/${username}`)
      .then((res) => res.json())
      .then(setAvailabilities);
  }, [username]);

  // Extrait les jours disponibles (0-6) du user
  const availableDays = Array.from(new Set(availabilities.map((a) => a.dayOfWeek)));

  // Détecte si un jour est dispo dans les données
  function isDayAvailable(date: Date) {
    return availableDays.includes(date.getDay());
  }

  // Quand une date est sélectionnée
  useEffect(() => {
    if (!selectedDate) return;

    const day = selectedDate.getDay();
    const times = availabilities
      .filter((a) => a.dayOfWeek === day)
      .map((a) => ({ start: a.startTime, end: a.endTime }))
      .flatMap((slot) => {
        const [h1, m1] = slot.start.split(':').map(Number);
        const [h2, m2] = slot.end.split(':').map(Number);
        const start = h1 * 60 + m1;
        const end = h2 * 60 + m2;

        const steps = [];
        for (let t = start; t < end; t += 30) {
          const h = Math.floor(t / 60);
          const m = t % 60;
          steps.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        }
        return steps;
      });

    setAvailableTimes(times);
  }, [selectedDate, availabilities]);

  async function handleBooking() {
    if (!selectedDate || !selectedTime || !visitor.name || !visitor.email) {
      toast.error('Remplis tous les champs. Champs manquants !!');
      return;
    }

    const datetime = setMinutes(
      setHours(new Date(selectedDate), parseInt(selectedTime.split(':')[0])),
      parseInt(selectedTime.split(':')[1]),
    );

    if (datetime < new Date()) {
      toast.error('Date invalide, Tu ne peux pas réserver dans le passé !');
      return;
    }

    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        name: visitor.name,
        email: visitor.email,
        date: datetime,
      }),
    });

    if (res.ok) {
      toast.success('Rendez-vous confirmé !');
      setSelectedTime('');
      setVisitor({ name: '', email: '' });
    } else {
      toast.error('Erreur lors de la réservation !!!');
    }
  }

  return (
    <div className="space-y-6">
      <DayPicker
        selected={selectedDate}
        onSelect={setSelectedDate}
        mode="single"
        modifiers={{ available: isDayAvailable }}
        modifiersClassNames={{ available: 'font-bold text-blue-600' }}
        disabled={(date) => !isDayAvailable(date)}
      />

      {selectedDate && (
        <div className="space-y-4">
          <p className="text-lg font-medium">Créneaux pour le {format(selectedDate, 'PPP')} :</p>

          <div className="flex flex-wrap gap-2">
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              placeholder="Votre nom"
              value={visitor.name}
              onChange={(e) => setVisitor((v) => ({ ...v, name: e.target.value }))}
            />
            <Input
              type="email"
              placeholder="Votre email"
              value={visitor.email}
              onChange={(e) => setVisitor((v) => ({ ...v, email: e.target.value }))}
            />
          </div>

          <Button className="mt-2" disabled={!selectedTime || !visitor.name || !visitor.email} onClick={handleBooking}>
            Confirmer le rendez-vous
          </Button>
        </div>
      )}
    </div>
  );
}
