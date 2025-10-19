import React from 'react';
import { AppHeader, ProductsContent } from '@src/components';
import { useGetProducts, useDeleteProduct } from '@src/hooks';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export function ProductsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = useGetProducts();

  const { deleteProduct, deletingProductId } = useDeleteProduct();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Products" />
      <ProductsContent
        products={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onRefresh={refetch}
        isRefreshing={isRefetching}
        onDelete={deleteProduct}
        deletingProductId={deletingProductId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
