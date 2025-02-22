import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import './globals.css';
import Providers from './provider';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClientComponentClient();
  const { data: session } = await supabase.auth.getSession();

  console.log(session);

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
