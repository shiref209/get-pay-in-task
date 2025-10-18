import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import type { TabScreenProps } from '../navigation/types';
import { fontSize, height, width } from '../utils';

export function LogoutScreen({ navigation }: TabScreenProps<'Logout'>) {
  const handleLogout = () => {
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
          onPress: () => {
            // TODO: Add your logout logic here
            // For example: clear auth tokens, reset state, etc.
            console.log('User logged out');
            Alert.alert('Logged out', 'You have been logged out successfully');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
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
