import { z } from 'zod';

/**
 * Schéma pour un créneau horaire uniquement (sans notion de jour)
 */
export const AvailabilityTimeSchema = z.object({
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
});

// Typage automatique du schéma
export type AvailabilityTimeType = z.infer<typeof AvailabilityTimeSchema>;

/**
 * Schéma pour une disponibilité liée à un jour de la semaine
 */
export const AvailabilitySchema = z
  .object({
    dayOfWeek: z.string().refine((val) => ['0', '1', '2', '3', '4', '5', '6'].includes(val)),
    startTime: z.string().regex(/^\d{2}:\d{2}$/), // Heure de début formatée
    endTime: z.string().regex(/^\d{2}:\d{2}$/), // Heure de fin formatée
  })
  .refine(
    (data) => {
      // Vérification logique métier: l'heure de début doit être inférieure à l'heure de fin
      return data.startTime < data.endTime;
    },
    {
      message: "L'heure de début doit être avant l'heure de fin.",
      path: ['endTime'], // Attache le message d'erreur sur `endTime`
    },
  );

export type AvailabilityType = z.infer<typeof AvailabilitySchema>;
