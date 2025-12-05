import { redirect } from 'next/navigation';
import { getSession } from '~/shared/lib/session';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.isAuthenticated) {
    redirect('/auth');
  }

  return <div>{children}</div>;
}
