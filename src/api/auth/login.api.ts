import { ILoginDTO, ILoginResponse } from '@src/models';
import axiosInstance from '../../utils/axios.util';

// This url should be moved to .env file in real case scenario
const API_URL = 'https://dummyjson.com/auth/login';

/**
 * Login API call
 * @param credentials - Username and password
 * @returns Promise with login response
 */
export const loginApi = async (
  credentials: ILoginDTO,
): Promise<ILoginResponse> => {
  const response = await axiosInstance.post<ILoginResponse>(API_URL, {
    username: credentials.username.trim(),
    password: credentials.password.trim(),
    expiresInMins: credentials.expiresInMins || 30,
  });

  return response.data;
};
