import { BadgeCheck } from 'lucide-react';
import { OPENING_BENEFITS, REGISTRATION_INVESTMENT_INFO } from '../constant';
import { currencyFmt } from '~/shared/lib/format';

type RegistrationFormInformationProps = {
  price: number;
  benefits?: string[];
};

export function RegistrationFormInformation({ price, benefits }: RegistrationFormInformationProps) {
  const formattedPrice = currencyFmt.format(price);
  const benefitList = benefits && benefits.length > 0 ? benefits : OPENING_BENEFITS;

  return (
    <div className='w-full space-y-4 pb-4'>
      <div className='border-primary/60 bg-primary/5 w-full rounded-xl border p-5 shadow-sm'>
        <p className='text-primary text-xs font-semibold tracking-[0.25em] uppercase'>
          {REGISTRATION_INVESTMENT_INFO.heading}
        </p>
        <div className='mt-2 flex flex-wrap items-end gap-2'>
          <span className='text-foreground text-3xl leading-none font-bold'>{formattedPrice}</span>
          <span className='text-muted-foreground text-sm'>{REGISTRATION_INVESTMENT_INFO.priceNote}</span>
        </div>
        <p className='text-foreground mt-3 text-sm'>{REGISTRATION_INVESTMENT_INFO.description}</p>
      </div>
      <p className='text-foreground text-base font-medium'>
        Manfaat yang akan Mama dapatkan ketika mengikuti program ini:
      </p>
      <div className='text-foreground w-full space-y-3 text-sm'>
        {benefitList.map((benefit) => (
          <div key={benefit} className='flex items-start gap-3'>
            <BadgeCheck className='text-primary size-5' />
            <span className='w-full'>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
