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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { createTransactionAction } from '../action';
import { RegistrationSchema, RegistrationSchemaType } from '../schema';
import { RegistrationFormInformation } from './registration-form-information';
import { RegistrationFormInput } from './registration-form-input';
import { RegistrationFormConfirmation } from './registration-form-confirmation';

export function RegistrationForm() {
  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema as any),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: 'dien',
      email: 'dien@gmail.com',
      phoneNumber: 81915614444,
      certificateName: 'dien',
      lastEducation: 'S1',
      motherAge: 25,
      address: 'Depok',
    },
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
      component: <RegistrationFormInformation />,
    },
    {
      title: 'Data Peserta',
      fields: Object.keys(RegistrationSchema.shape),
      component: <RegistrationFormInput form={form} />,
    },
    {
      title: 'Konfirmasi',
      fields: [],
      component: <RegistrationFormConfirmation formValues={formValues} />,
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
            <SubmitButton className='flex-1' type='submit' disabled={createTransactionMutation.isPending}>
              {createTransactionMutation.isPending ? 'Memproses...' : 'Proses Pembayaran'}
            </SubmitButton>
          </div>
        </MultiStepFormContent>
      </MultiStepFormProvider>
    </form>
  );
}
