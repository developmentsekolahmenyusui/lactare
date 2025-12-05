import { redirect } from 'next/navigation';
import { AuthPage } from '~/feature/auth/page/auth-page';
import { getSession } from '~/shared/lib/session';

export default async function Page() {
  const session = await getSession();
  if (session.isAuthenticated) {
    redirect('/dashboard/transaction');
  }

  return <AuthPage />;
}
