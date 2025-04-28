import { z } from 'zod';

export const AvailabilityTimeSchema = z.object({
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
});

export type AvailabilityTimeType = z.infer<typeof AvailabilityTimeSchema>;

export const AvailabilitySchema = z.object({
  dayOfWeek: z.number().refine((val) => [0, 1, 2, 3, 4, 5, 6].includes(val)),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
});

export type AvailabilityType = z.infer<typeof AvailabilitySchema>;
