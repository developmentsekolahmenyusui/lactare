import { z } from 'zod';

export const RegistrationConfigFormSchema = z.object({
  id: z.string().trim().optional(),
  batchTitle: z.string({ error: 'Nama batch wajib diisi' }).trim().min(1, { message: 'Nama batch wajib diisi' }),
  price: z.coerce
    .number({ error: 'Harga tidak valid' })
    .refine((value) => Number.isFinite(value), { message: 'Harga tidak valid' })
    .min(0, { message: 'Harga tidak valid' }),
  whatsappLink: z
    .string({ error: 'Link WhatsApp wajib diisi' })
    .trim()
    .url({ message: 'Masukkan URL WhatsApp yang valid' }),
  isFormOpen: z.coerce.boolean({ error: 'Status formulir wajib dipilih' }),
});

export type RegistrationConfigFormValues = z.infer<typeof RegistrationConfigFormSchema>;
