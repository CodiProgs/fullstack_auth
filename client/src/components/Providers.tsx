"use client";

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import ErrorHandler from '@/components/ErrorHandler';
import { client } from '@/utils/apolloClient';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <ErrorHandler>
          {children}
        </ErrorHandler>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default Providers;