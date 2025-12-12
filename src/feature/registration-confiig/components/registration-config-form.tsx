'use client';

import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { RegistrationConfig } from '~/shared/db/schema';
import { RegistrationConfigFormSchema, RegistrationConfigFormValues } from '../schema';
import { saveRegistrationConfig, getRegistrationConfig } from '../action';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/shared/shadcn/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '~/shared/shadcn/field';
import { Input } from '~/shared/shadcn/input';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '~/shared/shadcn/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/shadcn/select';
import { Button } from '~/shared/shadcn/button';
import { Badge } from '~/shared/shadcn/badge';
import { Alert, AlertDescription } from '~/shared/shadcn/alert';
import { currencyFmt, dateFmt } from '~/shared/lib/format';

type FeedbackMessage = { type: 'success' | 'error'; message: string } | null;

const mapConfigToFormValues = (config: RegistrationConfig): RegistrationConfigFormValues => ({
  id: config.id,
  batchTitle: config.batchTitle,
  price: config.price,
  whatsappLink: config.whatsappLink,
  isFormOpen: config.isFormOpen,
});

type RegistrationConfigFormProps = {
  initialConfig: RegistrationConfig;
};

export function RegistrationConfigForm({ initialConfig }: RegistrationConfigFormProps) {
  const queryClient = useQueryClient();
  const [feedback, setFeedback] = useState<FeedbackMessage>(null);

  const form = useForm<RegistrationConfigFormValues>({
    resolver: zodResolver(RegistrationConfigFormSchema as any),
    mode: 'onBlur',
    defaultValues: mapConfigToFormValues(initialConfig),
  });

  const {
    data: config,
    isLoading: isLoadingConfig,
    isFetching,
  } = useQuery({
    queryKey: ['registration-config'],
    queryFn: () => getRegistrationConfig(),
    initialData: initialConfig,
    placeholderData: (previousData) => previousData ?? initialConfig,
    refetchOnWindowFocus: false,
  });

  const latestConfig = config ?? initialConfig;

  useEffect(() => {
    form.reset(mapConfigToFormValues(latestConfig));
  }, [latestConfig, form]);

  const watchedPrice = form.watch('price');
  const formattedPrice = useMemo(() => {
    const numericValue = typeof watchedPrice === 'number' && Number.isFinite(watchedPrice) ? watchedPrice : 0;
    return currencyFmt.format(numericValue);
  }, [watchedPrice]);

  const saveMutation = useMutation({
    mutationFn: async (values: RegistrationConfigFormValues) => {
      return await saveRegistrationConfig(values);
    },
    onSuccess: async (config) => {
      setFeedback({ type: 'success', message: 'Konfigurasi berhasil disimpan.' });
      await queryClient.invalidateQueries({ queryKey: ['registration-config'] });
      form.reset(mapConfigToFormValues(config));
    },
    onError: () => {
      setFeedback({ type: 'error', message: 'Gagal menyimpan konfigurasi. Silakan coba lagi.' });
    },
  });

  const isBusy = saveMutation.isPending || isFetching || isLoadingConfig;
  const { isDirty } = form.formState;
  const lastUpdatedAt =
    latestConfig.updatedAt instanceof Date
      ? latestConfig.updatedAt
      : latestConfig.updatedAt
        ? new Date(latestConfig.updatedAt)
        : null;

  const handleReset = () => {
    setFeedback(null);
    form.reset(mapConfigToFormValues(latestConfig));
  };

  const onSubmit = (values: RegistrationConfigFormValues) => {
    setFeedback(null);
    saveMutation.mutate(values);
  };

  return (
    <Card className='mt-6 w-full max-w-5xl'>
      <CardHeader className='gap-1.5'>
        <CardTitle>Konfigurasi Pendaftaran</CardTitle>
        <CardDescription>Perbarui informasi batch pendaftaran dan kontrol status formulir.</CardDescription>
        <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-sm'>
          <Badge variant={latestConfig.isFormOpen ? 'default' : 'destructive'}>
            {latestConfig.isFormOpen ? 'Formulir Dibuka' : 'Formulir Ditutup'}
          </Badge>
          {lastUpdatedAt && (
            <span className='text-xs text-neutral-500'>Diperbarui {dateFmt.format(lastUpdatedAt)}</span>
          )}
        </div>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <CardContent className='flex flex-col gap-6'>
          {feedback && (
            <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}

          <FieldGroup className='grid gap-5 md:grid-cols-2'>
            <Controller
              name='batchTitle'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-1.5 md:col-span-2'>
                  <FieldLabel htmlFor='batchTitle'>Nama Batch *</FieldLabel>
                  <Input
                    {...field}
                    id='batchTitle'
                    type='text'
                    placeholder='Contoh: Batch 3 - Januari 2025'
                    disabled={isBusy}
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Nama batch ditampilkan kepada calon peserta.</FieldDescription>
                  )}
                </Field>
              )}
            />

            <Controller
              name='price'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-1.5'>
                  <FieldLabel htmlFor='price'>Biaya Investasi *</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>Rp</InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id='price'
                      type='number'
                      min={0}
                      step='1000'
                      placeholder='Contoh: 1500000'
                      disabled={isBusy}
                      value={Number.isFinite(field.value as number) ? field.value : ''}
                      onChange={(event) => field.onChange(event.target.valueAsNumber)}
                    />
                    <InputGroupText className='pr-3'>/peserta</InputGroupText>
                  </InputGroup>
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Ditampilkan ke pengguna sebagai {formattedPrice}.</FieldDescription>
                  )}
                </Field>
              )}
            />

            <Controller
              name='whatsappLink'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-1.5 md:col-span-2'>
                  <FieldLabel htmlFor='whatsappLink'>Link WhatsApp *</FieldLabel>
                  <Input
                    {...field}
                    id='whatsappLink'
                    type='url'
                    placeholder='https://wa.me/62xxxx?text=Halo'
                    disabled={isBusy}
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Tautan diarahkan pada saat pengguna memerlukan bantuan.</FieldDescription>
                  )}
                </Field>
              )}
            />

            <Controller
              name='isFormOpen'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-1.5 md:col-span-1'>
                  <FieldLabel>Status Formulir *</FieldLabel>
                  <Select
                    value={field.value ? 'open' : 'closed'}
                    onValueChange={(value) => field.onChange(value === 'open')}
                    disabled={isBusy}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Pilih status...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='open'>Dibuka</SelectItem>
                      <SelectItem value='closed'>Ditutup</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Tentukan apakah formulir pendaftaran dapat diakses publik.</FieldDescription>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className='flex flex-wrap justify-end gap-3 border-t'>
          <Button type='button' variant='outline' onClick={handleReset} disabled={isBusy || !isDirty}>
            Reset
          </Button>
          <Button type='submit' disabled={isBusy || !isDirty}>
            {saveMutation.isPending && <Loader2 className='size-4 animate-spin' />}
            Simpan Konfigurasi
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
