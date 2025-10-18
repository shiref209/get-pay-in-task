import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { loginSuccess } from '../../store/slices/auth.slice';
import type { RootStackScreenProps } from '../../navigation/types';
import { ILoginResponse } from '@src/models';
import { USER_TYPES } from '@src/constants';
import { loginApi } from '@src/api/auth';
import { getToken, storeToken } from '@src/utils';

/**
 * Custom hook for login functionality using React Query
 * Handles authentication, Keychain token storage, Redux state updates, and navigation
 *
 * @example
 * ```tsx
 * const { mutate: login, isPending, error } = useLogin();
 *
 * const handleLogin = () => {
 *   login({ username: 'emilys', password: 'emilyspass' });
 * };
 * ```
 */
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<RootStackScreenProps<'Login'>['navigation']>();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: async (data: ILoginResponse) => {
      // Store tokens in Keychain
      await storeToken('access', data.accessToken);
      if (data.refreshToken) {
        await storeToken('refresh', data.refreshToken);
      }
      console.log('tok log', await getToken('access'));
      // Store user data in Redux (isAuthenticated is set to true in the reducer)
      const userData = {
        _id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        phoneNumber: data.phone || '',
        type: USER_TYPES.USER,
        email: data.email,
        image: data.image,
      };
      dispatch(loginSuccess(userData));

      // Navigate to MainTabs and reset navigation stack
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        }),
      );
    },
  });
};
