import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontSize, height, width } from '../utils';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Electronics', count: 25 },
  { id: '2', name: 'Clothing', count: 48 },
  { id: '3', name: 'Home & Garden', count: 32 },
  { id: '4', name: 'Sports', count: 18 },
  { id: '5', name: 'Books', count: 56 },
  { id: '6', name: 'Toys', count: 12 },
];

interface Props {}

export const CategoriesScreen: React.FC<Props> = () => {
  const renderCategory = ({ item }: { item: (typeof MOCK_CATEGORIES)[0] }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.count} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={MOCK_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

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
  categoryCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: width(20),
    borderRadius: width(8),
    margin: width(6),
    minHeight: height(100),
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: fontSize(16),
    fontWeight: '600',
    marginBottom: height(4),
  },
  categoryCount: {
    fontSize: fontSize(14),
    color: '#666',
  },
});
