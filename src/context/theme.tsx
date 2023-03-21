import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
<<<<<<< HEAD
=======
import { useTranslation } from 'react-i18next';
>>>>>>> 980007e7796862484fdc37f75638889c02946af5
import { ConfigProvider } from 'antd';

const ThemeContext = createContext<{
  lng: string;
  setLng: Dispatch<SetStateAction<string>>;
}>({ lng: 'en', setLng: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [lng, setLng] = useState('en');
  const [dark, setDark] = useState(true);
<<<<<<< HEAD
=======
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
>>>>>>> 980007e7796862484fdc37f75638889c02946af5

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
