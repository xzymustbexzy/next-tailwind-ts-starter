import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';

const ThemeContext = createContext<{
  lng: string;
  setLng: Dispatch<SetStateAction<string>>;
}>({ lng: 'en', setLng: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [lng, setLng] = useState('en');
  const [dark, setDark] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const l = localStorage.getItem('i18n');
    if (l) {
      i18n.changeLanguage(l).then((r) => setLng(l));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('i18n', lng);
  }, [lng]);

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
