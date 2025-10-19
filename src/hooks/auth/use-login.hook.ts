import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { loginSuccess } from '../../store/slices/auth.slice';
import type { RootStackScreenProps } from '../../navigation/types';
import { ILoginResponse } from '@src/models';
import { USER_TYPES } from '@src/constants';
import { loginApi } from '@src/api/auth';
import { storeToken } from '@src/utils';
import { Alert } from 'react-native';
import {
  checkBiometricAvailability,
  getBiometryTypeName,
  isBiometricAuthEnabled,
} from '@src/utils';

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
      // Store user data in Redux (isAuthenticated is set to true in the reducer)
      const userData = {
        _id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        phoneNumber: data.phone || '',
        // User specified as admin has id 1
        type: data.id === 1 ? USER_TYPES.ADMIN : USER_TYPES.USER,
        email: data.email,
        image: data.image,
      };
      dispatch(loginSuccess(userData));

      // Check if biometric authentication is available and prompt user to enable it
      const { isAvailable, biometryType } = await checkBiometricAvailability();
      // Check if already enabled to avoid showing prompt again
      const alreadyEnabled = await isBiometricAuthEnabled();

      if (isAvailable && biometryType && !alreadyEnabled) {
        const biometryName = getBiometryTypeName(biometryType);

        // Use setTimeout to ensure alert shows properly on Android
        setTimeout(() => {
          Alert.alert(
            `Enable ${biometryName}?`,
            `Would you like to use ${biometryName} to unlock the app? This will require authentication after 10 seconds of inactivity or when the app goes to background.`,
            [
              {
                text: 'Not Now',
                style: 'cancel',
                onPress: () => {
                  // Navigate to MainTabs
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'MainTabs' }],
                    }),
                  );
                },
              },
              {
                text: 'Enable',
                onPress: async () => {
                  // Navigate to MainTabs
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'MainTabs' }],
                    }),
                  );
                },
              },
            ],
            { cancelable: false }, // Prevent dismissing by tapping outside
          );
        }, 500);
      } else {
        // Navigate to MainTabs if biometrics not available or already enabled
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          }),
        );
      }
    },
  });
};
