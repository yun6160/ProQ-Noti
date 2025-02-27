'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 60000
        }
      }
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Providers;
