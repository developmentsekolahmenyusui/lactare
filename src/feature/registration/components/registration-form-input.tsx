import { Controller, UseFormReturn } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '~/shared/shadcn/field';
import { Input } from '~/shared/shadcn/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/shared/shadcn/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/shadcn/select';
import { Education } from '~/shared/enum';
import { RegistrationSchemaType } from '../schema';

type RegistrationFormInputProps = {
  form: UseFormReturn<RegistrationSchemaType>;
};

export function RegistrationFormInput({ form }: RegistrationFormInputProps) {
  return (
    <FieldGroup className='mb-6 grid gap-5.5 md:grid-cols-6'>
      <Controller
        name='fullName'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='col-span-full gap-1.5'>
            <FieldLabel htmlFor='fullName'>Nama Lengkap *</FieldLabel>
            <Input
              {...field}
              id='fullName'
              type='text'
              onChange={(e) => {
                field.onChange(e.target.value);
                form.setValue('fullName', e.target.value);
              }}
              aria-invalid={fieldState.invalid}
              placeholder='Contoh: Siti Andini Pratiwi'
            />

            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Nama lengkap sesuai identitas.</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name='email'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='gap-1 md:col-span-3'>
            <FieldLabel htmlFor='email'>Email *</FieldLabel>
            <Input
              {...field}
              id='email'
              type='text'
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              aria-invalid={fieldState.invalid}
              placeholder='Contoh: siti@gmail.com'
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Email untuk konfirmasi dan tagihan kelas.</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name='phoneNumber'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='gap-1 md:col-span-3'>
            <FieldLabel htmlFor='phoneNumber'>Nomor Telepon *</FieldLabel>
            <InputGroup>
              <InputGroupAddon className='text-black'>+62</InputGroupAddon>
              <InputGroupInput
                {...field}
                id='phoneNumber'
                type='number'
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                placeholder='Nomor WhatsApp aktif'
              />
            </InputGroup>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Nomor telepon/WhatsApp aktif.</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name='certificateName'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='col-span-full gap-1.5'>
            <FieldLabel htmlFor='certificateName'>Nama Sertifikat *</FieldLabel>
            <Input
              {...field}
              id='certificateName'
              type='text'
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              aria-invalid={fieldState.invalid}
              placeholder='Nama yang dicetak di sertifikat'
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Nama yang tercetak di sertifikat.</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name='lastEducation'
        control={form.control}
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid} className='col-span-full gap-1.5'>
              <FieldLabel htmlFor='lastEducation'>Pendidikan Terakhir *</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Pilih jenjang pendidikan terakhir' />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Education).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      <FieldSeparator className='col-span-full' />

      <Controller
        name='motherAge'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='gap-1 md:col-span-2'>
            <FieldLabel htmlFor='motherAge'>Usia Ibu *</FieldLabel>
            <Input
              {...field}
              id='motherAge'
              type='number'
              onChange={(e) => {
                field.onChange(e.target.valueAsNumber);
              }}
              min={0}
              value={field.value ?? ''}
              aria-invalid={fieldState.invalid}
              placeholder='Contoh: 29'
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Usia ibu saat mengikuti kelas.</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name='pregnancyAge'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='gap-1 md:col-span-2'>
            <FieldLabel htmlFor='pregnancyAge'>Usia Kandungan </FieldLabel>
            <Input
              {...field}
              id='pregnancyAge'
              type='number'
              onChange={(e) => {
                field.onChange(e.target.valueAsNumber);
              }}
              aria-invalid={fieldState.invalid}
              placeholder='Contoh: 32 (minggu)'
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Usia kandungan (Optional).</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name='childAge'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='gap-1 md:col-span-2'>
            <FieldLabel htmlFor='childAge'>Usia anak </FieldLabel>
            <Input
              {...field}
              id='childAge'
              type='number'
              onChange={(e) => {
                field.onChange(e.target.valueAsNumber);
              }}
              aria-invalid={fieldState.invalid}
              placeholder='Contoh: 6 (bulan)'
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Usia anak kini (Optional).</FieldDescription>
            )}
          </Field>
        )}
      />

      <FieldSeparator className='col-span-full' />

      <Controller
        name='address'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='col-span-full gap-1.5'>
            <FieldLabel htmlFor='address'>Domisili *</FieldLabel>
            <Input
              {...field}
              id='address'
              type='text'
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              aria-invalid={fieldState.invalid}
              placeholder='Contoh: Bekasi, Jawa Barat'
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Kota/kabupaten domisili saat ini.</FieldDescription>
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
