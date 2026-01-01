'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MultiStepFormProvider, Stepfields } from '~/shared/hooks/use-multi-step-viewer';
import {
  FormHeader,
  MultiStepFormContent,
  NextButton,
  PreviousButton,
  StepFields,
  SubmitButton,
} from '~/shared/shadcn/multi-step-viewer';
import { Button } from '~/shared/shadcn/button';
import { CalendarX2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { createTransactionAction } from '../action';
import { RegistrationSchema, RegistrationSchemaType } from '../schema';
import { RegistrationFormInformation } from './registration-form-information';
import { RegistrationFormInput } from './registration-form-input';
import { RegistrationFormConfirmation } from './registration-form-confirmation';
import { RegistrationConfig } from '~/shared/db/schema';

type RegistrationFormProps = {
  config: RegistrationConfig;
};

export function RegistrationForm({ config }: RegistrationFormProps) {
  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema as any),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formValues = form.watch();

  const createTransactionMutation = useMutation({
    mutationFn: async (values: RegistrationSchemaType) => {
      return await createTransactionAction(values);
    },
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = async (data: RegistrationSchemaType) => {
    try {
      await createTransactionMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to submit registration', error);
    }
  };

  const steps: Stepfields[] = [
    {
      title: 'Informasi',
      fields: [],
      component: <RegistrationFormInformation price={config.price} benefits={config.benefits ?? []} />,
    },
    {
      title: 'Data Peserta',
      fields: Object.keys(RegistrationSchema.shape),
      component: <RegistrationFormInput form={form} />,
    },
    {
      title: 'Konfirmasi',
      fields: [],
      component: <RegistrationFormConfirmation formValues={formValues} price={config.price} />,
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
      {config.isFormOpen ? (
        <MultiStepFormProvider
          stepsFields={steps}
          onStepValidation={async (step) => {
            const isValid = await form.trigger(step.fields as any);
            return isValid;
          }}
        >
          <MultiStepFormContent>
            <div className='flex w-full flex-row items-center justify-center pb-2 md:pb-4'>
              <h1 className='text-center text-3xl font-semibold'>{config.batchTitle}</h1>
            </div>
            <FormHeader />
            <StepFields />
            <div className='flex flex-row items-center justify-center gap-x-3'>
              <PreviousButton className='flex-1' disabled={createTransactionMutation.isPending}>
                <ChevronLeft />
                Kembali
              </PreviousButton>
              <NextButton className='flex-1' disabled={createTransactionMutation.isPending}>
                Lanjut <ChevronRight />
              </NextButton>
              <SubmitButton className='flex-1' type='submit' disabled={createTransactionMutation.isPending}>
                {createTransactionMutation.isPending ? 'Memproses...' : 'Proses Pembayaran'}
              </SubmitButton>
            </div>
          </MultiStepFormContent>
        </MultiStepFormProvider>
      ) : (
        <div className='border-muted bg-muted/30 flex flex-col items-center gap-6 rounded-2xl border border-dashed p-6 text-center'>
          <div className='bg-primary/10 text-primary flex size-20 items-center justify-center rounded-full'>
            <CalendarX2 className='size-10' />
          </div>
          <div className='space-y-3'>
            <p className='text-primary text-sm font-semibold tracking-[0.3em] uppercase'>Formulir Ditutup</p>
            <h2 className='text-foreground text-2xl leading-snug font-semibold'>
              Pendaftaran Sekolah Menyusui.id sudah ditutup
            </h2>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              Terima kasih atas antusiasmenya. Jika Mama ingin mendapatkan informasi ketika batch berikutnya dibuka,
              silakan hubungi tim kami melalui WhatsApp. Kami akan menghubungi Mama kembali secepatnya.
            </p>
          </div>
          <div className='w-full space-y-2'>
            <Button asChild size='lg' className='w-full justify-center gap-3 text-base font-semibold'>
              <a href={config.whatsappLink} target='_blank' rel='noreferrer noopener'>
                <MessageCircle className='size-5' /> Hubungi Admin via WhatsApp
              </a>
            </Button>
            <p className='text-muted-foreground text-xs'>
              Tombol akan membuka percakapan WhatsApp baru dengan admin Sekolah Menyusui.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}
