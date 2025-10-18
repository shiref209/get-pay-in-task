import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import type { RootStackScreenProps } from '../navigation/types';
import { fontSize, height, width } from '../utils';

export function DetailsScreen({
  navigation,
  route,
}: RootStackScreenProps<'Details'>) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.text}>Item ID: {id}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width(16),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    marginBottom: height(16),
  },
  text: {
    fontSize: fontSize(16),
    marginBottom: height(24),
  },
});
