import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

const ActivePageContext = createContext<{
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
}>({ page: 'online_stream', setPage: () => {} });

export const ActivePageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState('online_stream');

  return (
    <ActivePageContext.Provider value={{ page, setPage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePageContext = () => {
  const context = useContext(ActivePageContext);
  if (!context) {
    console.error('use theme context in generate page!');
  }
  return context;
};
