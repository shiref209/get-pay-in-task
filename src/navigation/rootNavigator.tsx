import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { LoginScreen } from '../screens';
import { getIsAuthenticated } from '../store/slices/auth.slice';
import { BottomTabsNavigator } from './bottom-tabs-navigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainTabs' : 'Login'}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: true,
        animation: 'default',
        animationDuration: 300,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabsNavigator}
        options={{
          title: 'GetPayIn',
        }}
      />
    </Stack.Navigator>
  );
}
