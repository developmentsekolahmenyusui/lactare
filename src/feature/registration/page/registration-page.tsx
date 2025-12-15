'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Button } from '~/shared/shadcn/button';
import { RegistrationForm } from '../components/registration-form';
import { getRegistrationConfig } from '~/feature/registration-confiig/action';

export function RegistrationPage() {
  const {
    data: config,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['registration-config'],
    queryFn: () => getRegistrationConfig(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className='flex min-h-svh w-full items-center justify-center'>
        <div className='text-muted-foreground flex flex-col items-center gap-3'>
          <Loader2 className='size-6 animate-spin' />
          <p>Menyiapkan formulir pendaftaran...</p>
        </div>
      </div>
    );
  }

  if (isError || !config) {
    return (
      <div className='flex min-h-svh w-full items-center justify-center p-5'>
        <div className='mx-auto flex w-full max-w-lg flex-col items-center gap-4 rounded-lg border bg-white p-8 text-center'>
          <p className='text-foreground text-base font-semibold'>Gagal memuat konfigurasi pendaftaran.</p>
          <p className='text-muted-foreground text-sm'>Silakan coba lagi beberapa saat lagi.</p>
          <Button onClick={() => refetch()} variant='default'>
            Coba Lagi
          </Button>
          {error instanceof Error && <p className='text-muted-foreground text-xs'>{error.message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-5'>
      <div className='w-full max-w-3xl'>
        <div className='mx-auto w-full max-w-3xl overflow-hidden rounded-lg border bg-white'>
          <RegistrationForm config={config} />
        </div>
      </div>
    </div>
  );
}
