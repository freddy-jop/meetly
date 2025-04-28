import { z } from 'zod';

export const BookingSchema = z.object({
  name: z.string().min(2, 'Ton nom est requis'),
  email: z.string().email('Un email valide est requis'),
  date: z.string().min(5, 'Choisis une heure !'),
});

export type BookingType = z.infer<typeof BookingSchema>;
