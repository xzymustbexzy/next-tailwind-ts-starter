import { createContext, ReactNode, useContext, useRef } from 'react';

const LayerContext = createContext<{} | null>(null);

export const LayerProvider = ({ children }: { children: ReactNode }) => {
  return <LayerContext.Provider value={{}}>{children}</LayerContext.Provider>;
};

export const useLayerContext = () => {
  const context = useContext(LayerContext);
  if (!context) {
    console.error('must use layer context in provider!');
  }
  return context;
};
