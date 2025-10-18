import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DetailsScreen, HomeScreen } from '../screens';
import { BottomTabsNavigator } from './bottom-tabs-navigator';
import type { RootStackParamList } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <>
      <SafeAreaView />
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          headerShadowVisible: true,
          animation: 'default',
          animationDuration: 300,
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={BottomTabsNavigator}
          options={{
            title: 'GetPayIn',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Details',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
