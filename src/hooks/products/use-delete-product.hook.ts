import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductApi } from '@src/api';
import { QUERY_KEYS } from '@src/constants';
import { toastMessage } from '@src/utils';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: number) => deleteProductApi(productId),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });

      toastMessage({
        text: 'Product Deleted',
        type: 'success',
      });
    },
    onError: () => {
      toastMessage({
        text: 'Something went wrong!',
        type: 'error',
      });
    },
  });

  return {
    deleteProduct: mutation.mutate,
    deletingProductId: mutation.isPending ? mutation.variables : undefined,
    isDeleting: mutation.isPending,
  };
};
