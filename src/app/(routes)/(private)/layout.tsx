import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '~/shared/lib/session';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.isAuthenticated) {
    redirect('/auth');
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <nav className="sticky top-0 z-10 flex flex-row items-center justify-center gap-6 border-b bg-white/95 px-6 py-4 text-sm font-medium backdrop-blur">
        <Link href="/transaction" className="text-foreground hover:text-primary">
          Transaction
        </Link>
        <Link href="/registration-config" className="text-foreground hover:text-primary">
          Config
        </Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
