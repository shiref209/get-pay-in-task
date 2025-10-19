import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@src/constants';
import { IProductsResponse } from '@src/models';
import { getProductsApi } from '@src/api';

interface Props {
  category?: string;
  limit?: number;
}

export const useGetProducts = ({ category, limit = 10 }: Props = {}) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IProductsResponse>({
      queryKey: [QUERY_KEYS.PRODUCTS, category],
      queryFn: ({ pageParam = 0 }) =>
        getProductsApi({
          category,
          limit,
          skip: pageParam as number,
        }),
      getNextPageParam: lastPage => {
        const nextSkip = lastPage.skip + lastPage.limit;

        if (nextSkip < lastPage.total) {
          return nextSkip;
        }

        return undefined;
      },
      initialPageParam: 0,
    });

  const products = data?.pages?.flatMap(page => page.products) ?? [];

  return {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    total: data?.pages?.[0]?.total ?? 0,
  };
};
