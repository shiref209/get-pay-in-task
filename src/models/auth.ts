export interface IUser {
  id: number;
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  expiresInMins?: number;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Login request payload
 */
export interface ILoginDTO {
  username: string;
  password: string;
  expiresInMins?: number;
}

/**
 * Login response from DummyJSON API
 */
export interface ILoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  phone?: string;
}
