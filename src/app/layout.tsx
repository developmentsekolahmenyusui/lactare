import type { Metadata } from 'next';
import { Alan_Sans } from 'next/font/google';
import '~/shared/css/globals.css';
import { Provider } from '~/shared/provider';

const geistSans = Alan_Sans({
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sekolah Menyusui',
  description: 'Portal resmi pendaftaran Sekolah Menyusui.id untuk kelas persiapan menyusui dan konsultasi premium.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
