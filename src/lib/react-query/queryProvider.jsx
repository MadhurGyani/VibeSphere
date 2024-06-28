import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//import {ReactQ}
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }) => {
  return (
     <QueryClientProvider client={queryClient}>
      
     <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
