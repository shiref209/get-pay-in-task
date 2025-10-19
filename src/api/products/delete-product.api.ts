import { IProduct } from '@src/models';
import axiosInstance from '../../utils/axios.util';

export const deleteProductApi = async (
  productId: number,
): Promise<IProduct> => {
  const response = await axiosInstance.delete<IProduct>(`products/${productId}`);
  return response.data;
};
