"use client"

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        //staleTime: 60 * 1000, // is the amout of the time that data in the cach will stay fresh until its refetched again
        staleTime: 60 * 1000, // now the data always automatcali becamoe stale
      }
    }
  })
}

let browserQuneryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client for each request
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React suspends during initial render. This may not be needed if we have a suspense boundary BELOW the creation of the query client
    if (!browserQuneryClient) browserQuneryClient = makeQueryClient();
    return browserQuneryClient;
  }
}

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const quneryClient = getQueryClient();

  return (
    <>
      <QueryClientProvider client={quneryClient}>
        {children}
      </QueryClientProvider>
    </>
  )
}
