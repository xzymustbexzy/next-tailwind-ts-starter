import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { getNonce, getToken, refreshToken } from '@/services/auth';
import { message } from 'antd';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useStoreImg } from '@/hooks/useStoreImg';

interface IUser {
  publicAddress: string;
  token: string;
}

const AuthContext = createContext<{
  user: IUser | null;
  login: () => Promise<any>;
  logout: () => Promise<any>;
  isLoadingUser: boolean;
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoadingUser: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const reqAxiosInterceptor = useRef(0);
  const resAxiosInterceptor = useRef(0);

  const queryClient = useQueryClient();
  const { clearLocalImg } = useStoreImg();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const noAuthRouteList = ['/', '/mint'];

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const userStore = window.localStorage.getItem('user');
      if (
        !user?.token &&
        !userStore &&
        !noAuthRouteList.includes(router.pathname)
      ) {
        await router.push('/');
      }
    })();
  }, [router, user]);

  const logout = useCallback(async () => {
    window.localStorage.removeItem('user');
    await queryClient.invalidateQueries();
    setUser(null);
    setIsLoadingUser(false);
    await clearLocalImg();
  }, [queryClient]);

  const login = useCallback(async () => {
    try {
      // get current ethereum public address
      const { ethereum } = window as any;
      if (!ethereum) {
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
      setIsLoadingUser(true);
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const publicAddress = accounts[0]?.toLowerCase();

      const nonce = await getNonce(publicAddress);

      // use got nonce to sign
      const message = `login nonce: ${nonce}`;
      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, publicAddress],
      });

      const loginRes = await getToken(publicAddress, signature);
      // store jwt and user state
      setUser({
        publicAddress,
        token: loginRes,
      });
      setIsLoadingUser(false);
    } catch (error) {
      await logout();
      console.error('login failed', error);
    }
  }, [logout]);

  useEffect(() => {
    (async () => {
      try {
        const { ethereum } = window as any;
        if (!ethereum) {
          // alert('Get MetaMask First Please!');
          return;
        }
        // let chainId = await ethereum.request({ method: 'eth_chainId' });
        // console.log('Connected to chain ' + chainId);
        // const mainnetId = '0x1';
        // if (chainId !== mainnetId) {
        //   alert('You are not connected to the Mainnet Network!');
        // }

        // try to find jwt to judge if login
        const userStore = window.localStorage.getItem('user');
        if (userStore) {
          const storedUser = JSON.parse(userStore) as IUser;
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          });
          const publicAddress = accounts[0];

          // if it has login and the address from jwt equals current metamask address, then set user into state
          if (publicAddress === storedUser?.publicAddress) {
            setUser(storedUser);
          }
        }

        // if metamask state changed, set user to null
        ethereum.on('accountsChanged', async () => {
          console.info('account change');
          await logout();
        });
      } catch (e) {
        await logout();
        console.error('init login state failed', e);
      }
    })();
  }, [logout]);

  useEffect(() => {
    let token = '';
    if (!user) return;

    window.localStorage.setItem('user', JSON.stringify(user));
    token = user.token;

    axios.interceptors.request.eject(reqAxiosInterceptor.current);
    axios.interceptors.response.eject(resAxiosInterceptor.current);

    reqAxiosInterceptor.current = axios.interceptors.request.use((config) => {
      config.headers!.Authorization = `Bearer ${token}`;
      return config;
    });
    resAxiosInterceptor.current = axios.interceptors.response.use(
      async (res) => {
        if (res?.data?.code === 12030) {
          await router.push('/collection');
          return Promise.resolve('not owned project, go back.');
        }
        return res;
      },
      async (err) => {
        // login expired or parse error
        if (err?.response?.status === 401 || err?.response?.data?.code === -1) {
          try {
            // when not refresh but get 401, refresh token; refresh req err will do noting and reject
            if (err.response.config?.url !== '/refresh') {
              const token = await refreshToken();
              if (token) {
                setUser({
                  publicAddress: user.publicAddress,
                  token,
                });
                return Promise.resolve('refresh token');
              }
              // no token get
              await logout();
              await message.error('login failed, please retry');
            }
          } catch (e) {
            // when 401 and refresh token failed, logout
            await logout();
            await message.error('login failed, please retry');
          }
        }
        return Promise.reject(err);
      },
    );
  }, [logout, router, user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error('use auth context in wrong place!');
  }
  return context;
};
