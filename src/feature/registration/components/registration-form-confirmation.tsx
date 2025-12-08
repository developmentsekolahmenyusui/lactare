import { REGISTRATION_INVESTMENT_INFO } from '../constant';
import { RegistrationSchemaType } from '../schema';

type RegistrationFormConfirmationProps = {
  formValues: RegistrationSchemaType;
};

export function RegistrationFormConfirmation({ formValues }: RegistrationFormConfirmationProps) {
  const getDisplayValue = (value?: string | number | null, suffix?: string): string => {
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
      value: formValues.phoneNumber ? `+62 ${formValues.phoneNumber}` : '-',
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

  return (
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
        <p className='text-primary text-xs font-semibold tracking-[0.25em] uppercase'>
          {REGISTRATION_INVESTMENT_INFO.heading}
        </p>
        <div className='mt-2 flex flex-wrap items-end gap-2'>
          <span className='text-foreground text-3xl leading-none font-bold'>{REGISTRATION_INVESTMENT_INFO.price}</span>
          <span className='text-muted-foreground text-sm'>{REGISTRATION_INVESTMENT_INFO.priceNote}</span>
        </div>
        <p className='text-foreground mt-3 text-sm'>{REGISTRATION_INVESTMENT_INFO.description}</p>
      </div>
    </div>
  );
}
