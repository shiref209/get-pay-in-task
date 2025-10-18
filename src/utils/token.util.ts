import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_SERVICE = 'com.getpayin.accessToken';
const REFRESH_TOKEN_SERVICE = 'com.getpayin.refreshToken';

/**
 * Store a token securely in the keychain
 * @param tokenType - Type of token (access or refresh)
 * @param token - The token string to store
 */
export const storeToken = async (
  tokenType: 'refresh' | 'access',
  token: string,
): Promise<boolean> => {
  try {
    const service =
      tokenType === 'access' ? ACCESS_TOKEN_SERVICE : REFRESH_TOKEN_SERVICE;
    await Keychain.setGenericPassword(tokenType, token, { service });
    return true;
  } catch (error) {
    console.error(`Failed to store ${tokenType} token:`, error);
    return false;
  }
};

/**
 * Retrieve a token from the keychain
 * @param tokenType - Type of token to retrieve (access or refresh)
 * @returns The token string or null if not found
 */
export const getToken = async (
  tokenType: 'refresh' | 'access',
): Promise<string | null> => {
  try {
    const service =
      tokenType === 'access' ? ACCESS_TOKEN_SERVICE : REFRESH_TOKEN_SERVICE;
    const credentials = await Keychain.getGenericPassword({ service });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error(`Failed to get ${tokenType} token:`, error);
    return null;
  }
};

/**
 * Delete all tokens from the keychain
 */
export const deleteToken = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword({ service: ACCESS_TOKEN_SERVICE });
    await Keychain.resetGenericPassword({ service: REFRESH_TOKEN_SERVICE });
    return true;
  } catch (error) {
    console.error('Failed to delete tokens:', error);
    return false;
  }
};
