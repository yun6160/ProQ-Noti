import { Metadata } from 'next';
import './globals.css';
import Providers from './provider';

export const metadata: Metadata = {
  title: '프로들의 솔랭을 실시간으로',
  icons: {
    icon: '/favicon.ico'
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
