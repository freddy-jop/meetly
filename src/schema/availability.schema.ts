import { z } from 'zod';

export const AvailabilityTimeSchema = z.object({
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
});

export type AvailabilityTimeType = z.infer<typeof AvailabilityTimeSchema>;

export const AvailabilitySchema = z
  .object({
    dayOfWeek: z.string().refine((val) => ['0', '1', '2', '3', '4', '5', '6'].includes(val)),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  })
  .refine(
    (data) => {
      // Comparaison startTime < endTime
      return data.startTime < data.endTime;
    },
    {
      message: "L'heure de début doit être avant l'heure de fin.",
      path: ['endTime'], // On attache l'erreur sur `endTime`
    },
  );

export type AvailabilityType = z.infer<typeof AvailabilitySchema>;
