import { Metadata } from 'next';
import './globals.css';
import Providers from './provider';
import Pwa from './_notification/Pwa';
import LayoutRouter from './layoutRouter';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/store/AuthProvider';

export const metadata: Metadata = {
  title: '프로들의 협곡을 실시간으로',
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
      <body className="flex justify-center w-full" style={{ height: '100vh' }}>
        <Providers>
          <AuthProvider />
          <LayoutRouter>{children}</LayoutRouter>
        </Providers>
        <Toaster />
      </body>
      <Pwa />
    </html>
  );
}
