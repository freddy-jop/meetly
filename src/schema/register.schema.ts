import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string({ required_error: 'Email requis' }).email('Email invalide'),
  username: z
    .string({ required_error: "Nom d'utilisateur requis" })
    .min(3, "Nom d'utilisateur trop court (3 caractères min.)"),
  password: z.string({ required_error: 'Mot de passe requis' }).min(6, 'Mot de passe trop court (6 caractères min.)'),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
