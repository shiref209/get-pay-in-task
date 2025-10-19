import React from 'react';
import { ProductsContent, AppHeader } from '@src/components';
import { useGetProducts } from '@src/hooks';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface Props {}

export const CategoriesScreen: React.FC<Props> = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = useGetProducts({ category: 'beauty' });

  if (isLoading || isRefetching) {
    return (
      <>
        <AppHeader title="Beauty" />
        <ActivityIndicator style={styles.loader} />
      </>
    );
  }
  return (
    <View style={styles.container}>
      <AppHeader title="Beauty" />
      <ProductsContent
        products={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onRefresh={refetch}
        isRefreshing={isRefetching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
  },
});
