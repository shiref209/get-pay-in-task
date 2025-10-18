import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { logOut } from '../store/slices/auth.slice';
import { store } from '../store/store';
import { navigateToScreen } from './navigation';
import { deleteToken, getToken, storeToken } from './token.util';
import { toastMessage } from './toast.util';
import { SANDBOX_URL } from '../../urls.json';

const instance = axios.create({
  baseURL: __DEV__ ? SANDBOX_URL : SANDBOX_URL,
});

instance.interceptors.request.use(async config => {
  const token = await getToken('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    const { exp } = jwtDecode<{ exp: number }>(token);
    const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return config;
    }
    // Call refresh token API
    try {
      const refreshToken = await getToken('refresh');

      // Call refresh API
      const response = await axios.post(
        `${SANDBOX_URL}user-dashboard/auth/refresh-token`,
        {
          refreshToken,
        },
      );
      const responseData = response?.data?.data ?? {};
      const { accessToken, refreshToken: newRefreshToken } = responseData;

      // Store the new access and refresh tokens in Keychain
      if (accessToken) {
        await storeToken('access', accessToken);
        instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }

      if (newRefreshToken) {
        await storeToken('refresh', newRefreshToken);
      }
    } catch (error) {
      // Logout and return to login screen
      await deleteToken();
      store.dispatch(logOut());
      navigateToScreen('Login');
      toastMessage({
        text: 'Session expired, please login again',
        type: 'error',
      });
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return Promise.reject(new Error(errorMessage));
    }
  }

  config.headers['Cache-Control'] = 'no-cache';
  return config;
});

export default instance;
