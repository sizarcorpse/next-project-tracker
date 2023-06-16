"use client";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </SWRConfig>
  );
};
