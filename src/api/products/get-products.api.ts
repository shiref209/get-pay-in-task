import { IProductsResponse } from '@src/models';
import axiosInstance from '../../utils/axios.util';

const API_URL = 'https://dummyjson.com/products';

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
    ? `${API_URL}/category/${category}`
    : API_URL;

  const response = await axiosInstance.get<IProductsResponse>(url, {
    params: { limit, skip },
  });

  return response.data;
};
