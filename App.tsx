import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { queryClient } from './src/libs/react-query/react-query';
import { RootNavigator } from './src/navigation';
import { store } from './src/store/store';
import { deleteToken, getToken } from '@src/utils';
import { hydrateAuth, logOut } from '@src/store';
import { BiometricLockProvider, useBiometricLock } from './src/context';
import { LockScreen } from './src/components';

if (__DEV__) {
  require('./src/libs/reactotron/ReactotronConfig');
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initialize auth on app startup
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = await getToken('access');
        if (accessToken) {
          // Token exists in Keychain, set auth state to true
          // Note: We don't store the token in Redux, only the auth status
          // The actual token will be retrieved from Keychain when needed (e.g., in axios interceptor)
          store.dispatch(hydrateAuth());
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Wait for initialization to complete before rendering
  // This prevents a flash of the login screen when user is actually authenticated
  if (!isInitialized) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BiometricLockProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <NavigationContainer>
              <View style={styles.container}>
                <RootNavigator />
                <AppLockOverlay />
              </View>
            </NavigationContainer>
          </SafeAreaProvider>
        </BiometricLockProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function AppLockOverlay() {
  const { isLocked, unlockApp } = useBiometricLock();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await deleteToken();
    store.dispatch(logOut());
    unlockApp();
    await deleteToken();
    // Navigate to Login screen and reset navigation stack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }),
    );
  };

  if (!isLocked) {
    return null;
  }

  return <LockScreen onUnlock={unlockApp} onLogout={handleLogout} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
