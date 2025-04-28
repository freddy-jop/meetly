'use client';

import { Button } from '@/components/ui/button';

type TimeSlotsProps = {
  userId: string;
  date: string;
  slots: string[]; // Liste des créneaux horaires disponibles
  onSelect: (time: string) => void; // Fonction pour mettre à jour la sélection d'heure
  selectedTime: string; // Heure sélectionnée
};

export const TimeSlots: React.FC<TimeSlotsProps> = ({ slots, onSelect, selectedTime }) => {
  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">Sélectionner un créneau horaire</div>

      {/* Affichage des créneaux disponibles */}
      <div className="grid grid-cols-3 gap-4">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <Button
              key={slot}
              variant={selectedTime === slot ? 'default' : 'outline'} // Si le créneau est sélectionné, appliquer un style différent
              onClick={() => onSelect(slot)} // Met à jour le créneau sélectionné
              className="w-full"
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
