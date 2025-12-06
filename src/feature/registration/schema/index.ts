import { z } from 'zod';

export const RegistrationSchema = z.object({
  fullName: z.string({ error: 'Wajib diisi' }),
  certificateName: z.string({ error: 'Wajib diisi' }),
  email: z.email({ error: 'Masukkan email yang valid' }),
  phoneNumber: z.coerce.number({ error: 'Masukkan nomor telepon yang valid' }),
  lastEducation: z.string({ error: 'Wajib diisi' }),
  motherAge: z.coerce.number({ error: 'Masukkan angka yang valid' }),
  pregnancyAge: z.coerce.number({ error: 'Masukkan angka yang valid' }).optional(),
  childAge: z.coerce.number({ error: 'Masukkan angka yang valid' }).optional(),
  address: z.string({ error: 'Wajib diisi' }),
});

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
