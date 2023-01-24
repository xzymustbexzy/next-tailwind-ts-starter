import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/context/theme';
import {ActivePageProvider} from "@/context/active_page";

const Contexts = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider>
        <ActivePageProvider>
          {children}
        </ActivePageProvider>
      </ThemeProvider>
    </>
  );
};
export default Contexts;
