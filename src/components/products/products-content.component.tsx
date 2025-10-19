import { fontSize, height, width } from '@src/utils';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ProductCard } from './product-card.component';
import { IProduct } from '@src/models';

interface Props {
  products: IProduct[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const ProductsContent: React.FC<Props> = ({
  products,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isRefreshing,
  onRefresh,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContainer}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#2196F3"
            colors={['#2196F3']}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#2196F3" style={styles.loader} />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.noProductsText}>No Products Found</Text>
          </View>
        }
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
  loader: {
    marginVertical: height(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(40),
  },
  noProductsText: {
    fontSize: fontSize(24),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
  },
});
