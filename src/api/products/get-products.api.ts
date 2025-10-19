import { IProductsResponse } from '@src/models';
import axiosInstance from '../../utils/axios.util';

interface GetProductsParams {
  limit?: number;
  skip?: number;
  category?: string;
}

export const getProductsApi = async (
  params?: GetProductsParams,
): Promise<IProductsResponse> => {
  const { limit = 30, skip = 0, category } = params || {};

  const url = category
    ? `products/category/${category}`
    : 'products';

  const response = await axiosInstance.get<IProductsResponse>(url, {
    params: { limit, skip },
  });

  return response.data;
};
