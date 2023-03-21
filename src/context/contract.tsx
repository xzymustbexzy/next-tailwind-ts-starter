import React, { createContext, ReactNode, useContext } from 'react';
import { usePass } from '@/hooks/usePass';
import { UseQueryResult } from 'react-query';

const ContractContext = createContext<
  { hasPassQuery: UseQueryResult } | undefined
>(undefined);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const { hasPassQuery } = usePass();
  return (
    <ContractContext.Provider value={{ hasPassQuery }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    console.error('must use layer context in provider!');
  }
  return context;
};
