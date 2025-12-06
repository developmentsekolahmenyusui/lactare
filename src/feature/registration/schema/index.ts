import { z } from 'zod';

export const RegistrationSchema = z.object({
  fullName: z.string({ error: 'This field is required' }),
  certificateName: z.string({ error: 'This field is required' }),
  email: z.email({ error: 'Please enter a valid email' }),
  phoneNumber: z.coerce.number({ error: 'Please enter a valid phone number' }),
  lastEducation: z.string().min(1, 'Please select an item'),
  motherAge: z.coerce.number({ error: 'Please enter a valid number' }),
  pregnancyAge: z.coerce.number({ error: 'Please enter a valid number' }).optional(),
  childAge: z.coerce.number({ error: 'Please enter a valid number' }).optional(),
  address: z.string({ error: 'This field is required' }),
});

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
