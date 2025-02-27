import { Metadata } from 'next';
import './globals.css';
import Providers from './provider';
import Pwa from './Pwa';

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
      <body>
        <Providers>
          <div className="bg-primary-white w-mobile screen:w-web h-full px-[2rem] py-[2rem]">
            {children}
          </div>
        </Providers>
      </body>
      <Pwa />
    </html>
  );
}
