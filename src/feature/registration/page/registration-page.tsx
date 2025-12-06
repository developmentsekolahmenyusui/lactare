import { RegistrationForm } from '../components/registration-form';
import { RegistrationBanner } from '../components/registration-banner';

export function RegistrationPage() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-5 md:p-10'>
      <div className='w-full max-w-3xl'>
        <div className='mx-auto w-full max-w-3xl overflow-hidden rounded-lg border'>
          <RegistrationBanner />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
