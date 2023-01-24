import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ConfigProvider } from 'antd';

const ThemeContext = createContext<{
  lng: string;
  setLng: Dispatch<SetStateAction<string>>;
}>({ lng: 'en', setLng: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [lng, setLng] = useState('en');
  const [dark, setDark] = useState(true);

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: '#4C4DDC',
      },
    });
  }, []);

  return (
    <ConfigProvider>
      <ThemeContext.Provider value={{ lng, setLng }}>
        <div className={`${lng} ${dark ? 'dark' : 'light'}`}>{children}</div>
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error('use theme context in generate page!');
  }
  return context;
};
