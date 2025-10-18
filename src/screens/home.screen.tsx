import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import type { RootStackScreenProps } from '../navigation/types';
import { fontSize, height, width } from '../utils';

export function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GetPayIn</Text>
      <Text style={styles.subtitle}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { id: '123' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(16),
    paddingHorizontal: width(16),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    marginBottom: height(8),
  },
  subtitle: {
    fontSize: fontSize(18),
    color: '#666',
    marginBottom: height(24),
  },
});
