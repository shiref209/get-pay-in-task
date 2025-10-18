import * as Keychain from 'react-native-keychain';

/**
 * Store the refresh token securely in the keychain
 */
export const storeToken = async (
  tokenType: 'refresh' | 'access',
  token: string,
): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword(tokenType, token);
    return true;
  } catch (error) {
    console.error('Failed to store token:', error);
    return false;
  }
};

/**
 * Retrieve the refresh token from the keychain
 * @param tokenType
 */
export const getToken = async (
  tokenType: 'refresh' | 'access',
): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username === tokenType) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};

/**
 * Delete the tokens from the keychain
 */
export const deleteToken = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword();
    return true;
  } catch (error) {
    console.error('Failed to delete refresh token:', error);
    return false;
  }
};
