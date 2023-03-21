import React, { ReactNode } from 'react';
<<<<<<< HEAD
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
=======
import { AuthProvider } from './auth';
import { CollectionProvider } from '@/context/collection';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LayerProvider } from '@/context/layer';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/config/i18n';
import { ContractProvider } from '@/context/contract';
import { ThemeProvider } from '@/context/theme';

const queryClient = new QueryClient();
const Contexts = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <DndProvider backend={HTML5Backend}>
            <AuthProvider>
              <ContractProvider>
                <CollectionProvider>
                  <LayerProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                  </LayerProvider>
                </CollectionProvider>
              </ContractProvider>
            </AuthProvider>
          </DndProvider>
        </QueryClientProvider>
      </I18nextProvider>
>>>>>>> 980007e7796862484fdc37f75638889c02946af5
    </>
  );
};
export default Contexts;
