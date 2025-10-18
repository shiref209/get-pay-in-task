import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontSize, height, width } from '../utils';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Product 1', price: '$29.99' },
  { id: '2', name: 'Product 2', price: '$39.99' },
  { id: '3', name: 'Product 3', price: '$49.99' },
  { id: '4', name: 'Product 4', price: '$19.99' },
  { id: '5', name: 'Product 5', price: '$59.99' },
];

export function ProductsScreen() {
  const renderProduct = ({ item }: { item: (typeof MOCK_PRODUCTS)[0] }) => (
    <TouchableOpacity style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: width(16),
  },
  productCard: {
    backgroundColor: '#f5f5f5',
    padding: width(16),
    borderRadius: width(8),
    marginBottom: height(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  productPrice: {
    fontSize: fontSize(16),
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
