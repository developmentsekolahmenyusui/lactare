import { RegistrationForm } from '../components/registration-form';

export function RegistrationPage() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-5'>
      <div className='w-full max-w-3xl'>
        <div className='mx-auto w-full max-w-3xl overflow-hidden rounded-lg border bg-white'>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
