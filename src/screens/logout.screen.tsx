import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { logOut } from '../store/slices/auth.slice';
import { deleteToken } from '../utils/token.util';
import type { TabScreenProps } from '../navigation/types';
import { fontSize, height, width } from '../utils';
import { AppHeader } from '@src/common';

export function LogoutScreen({ navigation }: TabScreenProps<'Logout'>) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            // Delete tokens from Keychain
            await deleteToken();

            // Dispatch logout action to clear auth state
            dispatch(logOut());

            // Navigate to Login screen and reset navigation stack
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              }),
            );
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Logout" />
      <View style={styles.content}>
        <Text style={styles.description}>
          Click the button below to logout from your account.
        </Text>
        <Button title="Logout" onPress={handleLogout} color="#f44336" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    padding: width(16),
    borderBottomWidth: height(1),
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width(24),
  },
  description: {
    fontSize: fontSize(16),
    textAlign: 'center',
    color: '#666',
    marginBottom: height(24),
    lineHeight: height(24),
  },
});
