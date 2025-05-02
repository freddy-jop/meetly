'use client';

import { LoaderEffectUpgrade } from '@/components/LoaderEffectUpgrade';
import { Button } from '@/components/ui/button';

type TimeSlotsProps = {
  slots: string[]; // Liste des créneaux horaires disponibles
  onSelect: (time: string) => void; // Fonction pour mettre à jour la sélection d'heure
  selectedTime: string; // Heure sélectionnée
};

export const TimeSlots: React.FC<TimeSlotsProps> = ({ slots, onSelect, selectedTime }) => {
  if (!slots.length && !selectedTime) return <LoaderEffectUpgrade />;

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">Sélectionner un créneau horaire</div>

      {/* Affichage des créneaux disponibles */}
      <div className="grid grid-cols-3 gap-4">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <Button
              key={slot}
              name={slot}
              role="button"
              variant={selectedTime === slot ? 'default' : 'outline'} // Si le créneau est sélectionné, appliquer un style différent
              onClick={() => onSelect(slot)} // Met à jour le créneau sélectionné
              className={`w-full px-4 py-2 ${selectedTime === slot ? 'text-blue-700 font-bold bg-slate-300' : 'text-black bg-blue-100'} rounded-2xl shadow hover:bg-slate-300 transition`}
            >
              {slot}
            </Button>
          ))
        ) : (
          <div>Aucun créneau disponible pour cette date.</div>
        )}
      </div>
    </div>
  );
};
