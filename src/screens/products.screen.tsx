import React from 'react';
import { ProductsContent } from '@src/components';
import { useGetProducts } from '@src/hooks';
import { ActivityIndicator } from 'react-native';

export function ProductsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = useGetProducts({ category: '' });

  if (isLoading || isRefetching) {
    return <ActivityIndicator />;
  }
  return (
    <ProductsContent
      products={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onRefresh={refetch}
      isRefreshing={isRefetching}
    />
  );
}
