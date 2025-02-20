'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, useState } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 60000
        },
      },
    }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
};

export default Providers;