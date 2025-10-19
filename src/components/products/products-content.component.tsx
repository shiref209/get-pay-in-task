import { fontSize, height, width } from '@src/utils';
import {
  ActivityIndicator,
  FlatList,
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
}

export const ProductsContent: React.FC<Props> = ({
  products,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
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
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size={'small'} /> : null
        }
        ListEmptyComponent={
          <View>
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
  noProductsText: {
    fontSize: fontSize(24),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
