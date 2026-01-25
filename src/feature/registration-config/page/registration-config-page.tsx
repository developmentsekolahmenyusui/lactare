import { RegistrationConfigForm } from '../components/registration-config-form';
import { getRegistrationConfig } from '../action';

export async function RegistrationConfigPage() {
  const config = await getRegistrationConfig();

  return (
    <div className='flex w-full items-center justify-center'>
      <RegistrationConfigForm initialConfig={config} />
    </div>
  );
}
