/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { queryClient } from './src/libs/react-query/react-query';
import { RootNavigator } from './src/navigation';
import { hydrateAuth } from './src/store/slices/auth.slice';
import { store } from './src/store/store';
import { getToken } from './src/utils/token.util';

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
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <View style={styles.container}>
              <RootNavigator />
            </View>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
