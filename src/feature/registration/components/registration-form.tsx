'use client';

import { RegistrationSchema, RegistrationSchemaType } from '../schema';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '~/shared/shadcn/field';
import { Input } from '~/shared/shadcn/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/shared/shadcn/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/shadcn/select';
import { Education } from '~/shared/enum';
import { MultiStepFormProvider, Stepfields } from '~/shared/hooks/use-multi-step-viewer';
import {
  FormHeader,
  MultiStepFormContent,
  NextButton,
  PreviousButton,
  StepFields,
  SubmitButton,
} from '~/shared/shadcn/multi-step-viewer';
import { BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const OPENING_BENEFITS = [
  '5 kali kelas, dengan 30 sub-bab pengajaran.',
  '4 kali sesi konsultasi Dokter Obgyn dan Konselor Laktasi.',
  'Free materi persiapan newborn.',
  'Sertifikat untuk peserta yang mengikuti seluruh sesi.',
  'Community Group Whatsapp Ikatan Alumni Sekolah Menyusui.id dengan berbagai macam benefit seperti kelas khusus alumni atau diskon produk.',
];

export function RegistrationForm() {
  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema as any),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const formValues = form.watch();

  const getDisplayValue = (value?: string | number | null, suffix?: string) => {
    const isEmptyValue =
      value === undefined || value === null || value === '' || (typeof value === 'number' && Number.isNaN(value));

    if (isEmptyValue) {
      return '-';
    }

    const formattedValue = typeof value === 'number' ? value.toString() : value;

    return suffix ? `${formattedValue} ${suffix}` : formattedValue;
  };

  const confirmationSummary = [
    {
      label: 'Nama Lengkap',
      value: getDisplayValue(formValues.fullName),
    },
    {
      label: 'Nama Sertifikat',
      value: getDisplayValue(formValues.certificateName),
    },
    {
      label: 'Email',
      value: getDisplayValue(formValues.email),
    },
    {
      label: 'Nomor Telepon',
      value: `+62 ${formValues.phoneNumber}`,
    },
    {
      label: 'Pendidikan Terakhir',
      value: getDisplayValue(formValues.lastEducation),
    },
    {
      label: 'Usia Ibu',
      value: getDisplayValue(formValues.motherAge, 'tahun'),
    },
    {
      label: 'Usia Kandungan',
      value: getDisplayValue(formValues.pregnancyAge, 'minggu'),
    },
    {
      label: 'Usia Anak',
      value: getDisplayValue(formValues.childAge, 'bulan'),
    },
    {
      label: 'Domisili',
      value: getDisplayValue(formValues.address),
    },
  ];

  const onSubmit = (data: RegistrationSchemaType) => {
    console.table(data);
  };

  const steps: Stepfields[] = [
    {
      title: 'Informasi',
      fields: [],
      component: (
        <div className='w-full space-y-4 pb-4'>
          <div className='border-primary/60 bg-primary/5 w-full rounded-xl border p-5 shadow-sm'>
            <p className='text-primary text-xs font-semibold tracking-[0.25em] uppercase'>Investasi Program</p>
            <div className='mt-2 flex flex-wrap items-end gap-2'>
              <span className='text-foreground text-3xl leading-none font-bold'>Rp 169.000</span>
              <span className='text-muted-foreground text-sm'>per peserta</span>
            </div>
            <p className='text-foreground mt-3 text-sm'>
              Satu kali pembayaran untuk seluruh rangkaian kelas dan konsultasi premium Sekolah Menyusui.
            </p>
          </div>
          <p className='text-foreground text-base font-medium'>
            Manfaat yang akan Bunda dapatkan ketika mengikuti program ini:
          </p>
          <div className='text-foreground w-full space-y-3 text-sm'>
            {OPENING_BENEFITS.map((benefit) => (
              <div key={benefit} className='flex items-start gap-3'>
                <BadgeCheck className='text-primary size-5' />
                <span className='w-full'>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Data Peserta',
      fields: [
        'fullName',
        'certificateName',
        'email',
        'phoneNumber',
        'lastEducation',
        'motherAge',
        'pregnancyAge',
        'childAge',
        'address',
      ],
      component: (
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
                  placeholder='Contoh: bunda@email.com'
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
      ),
    },
    {
      title: 'Konfirmasi',
      fields: [],
      component: (
        <div className='w-full space-y-8 pb-6'>
          <div className='w-full rounded-xl'>
            <p className='text-foreground text-sm font-semibold'>Ringkasan Data Peserta</p>
            <p className='text-muted-foreground mt-1 text-xs'>
              Mohon pastikan seluruh data sudah benar sebelum melanjutkan pembayaran.
            </p>
            <dl className='text-foreground mt-4 grid gap-3 md:grid-cols-2'>
              {confirmationSummary.map((item) => (
                <div key={item.label} className='bg-muted/40 rounded-lg border p-3'>
                  <dt className='text-muted-foreground text-[0.65rem] font-semibold tracking-[0.2em] uppercase'>
                    {item.label}
                  </dt>
                  <dd className='text-foreground mt-1 text-sm font-medium'>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className='border-primary/60 bg-primary/5 w-full rounded-xl border p-5 shadow-sm'>
            <p className='text-primary text-xs font-semibold tracking-[0.25em] uppercase'>Investasi Program</p>
            <div className='mt-2 flex flex-wrap items-end gap-2'>
              <span className='text-foreground text-3xl leading-none font-bold'>Rp 169.000</span>
              <span className='text-muted-foreground text-sm'>per peserta</span>
            </div>
            <p className='text-foreground mt-3 text-sm'>
              Satu kali pembayaran untuk seluruh rangkaian kelas dan konsultasi premium Sekolah Menyusui.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 p-5 md:p-8'>
      <div className='relative h-26 w-full overflow-visible md:h-46'>
        <Image
          src='/banner.png'
          alt='Sekolah Menyusui banner'
          fill
          className='absolute object-cover'
          unoptimized={true}
        />
      </div>
      <MultiStepFormProvider
        stepsFields={steps}
        onStepValidation={async (step) => {
          const isValid = await form.trigger(step.fields as any);
          return isValid;
        }}
      >
        <MultiStepFormContent>
          <FormHeader />
          <StepFields />
          <div className='flex flex-row items-center justify-center gap-x-3'>
            <PreviousButton className='flex-1'>
              <ChevronLeft />
              Kembali
            </PreviousButton>
            <NextButton className='flex-1'>
              Lanjut <ChevronRight />
            </NextButton>
            <SubmitButton className='flex-1' type='submit'>
              Proses Pembayaran
            </SubmitButton>
          </div>
        </MultiStepFormContent>
      </MultiStepFormProvider>
    </form>
  );
}
