import { redirect } from 'next/navigation';
import { getSession } from '~/shared/lib/session';
import { PrivateNavbar } from './_components/navbar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.isAuthenticated) {
    redirect('/auth');
  }

  return (
    <div className='bg-muted/20 min-h-screen'>
      <PrivateNavbar />
      <div>{children}</div>
    </div>
  );
}
