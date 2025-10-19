import ReactNativeBiometrics, { type BiometryType } from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

const BIOMETRIC_ENABLED_KEY = 'com.getpayin.biometricEnabled';

export interface BiometricStatus {
  isAvailable: boolean;
  biometryType: BiometryType | null;
}

/**
 * Get ReactNativeBiometrics instance
 */
const getBiometricsInstance = () => {
  try {
    const instance = new ReactNativeBiometrics({ allowDeviceCredentials: true });
    if (!instance || typeof instance.isSensorAvailable !== 'function') {
      return null;
    }
    return instance;
  } catch {
    return null;
  }
};

/**
 * Check if biometric authentication is available on the device
 */
export const checkBiometricAvailability =
  async (): Promise<BiometricStatus> => {
    try {
      const rnBiometrics = getBiometricsInstance();
      if (!rnBiometrics) {
        return {
          isAvailable: false,
          biometryType: null,
        };
      }

      const result = await rnBiometrics.isSensorAvailable();
      const { available, biometryType } = result;
      return {
        isAvailable: available,
        biometryType: biometryType || null,
      };
    } catch {
      return {
        isAvailable: false,
        biometryType: null,
      };
    }
  };

/**
 * Authenticate user with biometrics
 * @param promptMessage - Message to show in the biometric prompt
 * @returns true if authentication successful, false otherwise
 */
export const authenticateWithBiometrics = async (
  promptMessage: string = 'Authenticate to unlock',
): Promise<boolean> => {
  try {
    const rnBiometrics = getBiometricsInstance();
    if (!rnBiometrics) {
      return false;
    }

    const { success } = await rnBiometrics.simplePrompt({
      promptMessage,
      cancelButtonText: 'Cancel',
    });
    return success;
  } catch {
    return false;
  }
};

/**
 * Enable biometric authentication for the user
 * Stores a flag in Keychain indicating biometrics are enabled
 */
export const enableBiometricAuth = async (): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword(BIOMETRIC_ENABLED_KEY, 'true', {
      service: BIOMETRIC_ENABLED_KEY,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * Disable biometric authentication for the user
 */
export const disableBiometricAuth = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword({ service: BIOMETRIC_ENABLED_KEY });
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if biometric authentication is enabled for the user
 */
export const isBiometricAuthEnabled = async (): Promise<boolean> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: BIOMETRIC_ENABLED_KEY,
    });
    return credentials !== false && credentials.password === 'true';
  } catch {
    return false;
  }
};

/**
 * Get user-friendly biometry type name
 */
export const getBiometryTypeName = (
  biometryType: BiometryType | null,
): string => {
  if (!biometryType) {
    return 'Biometric Authentication';
  }

  switch (biometryType) {
    case 'FaceID':
      return 'Face ID';
    case 'TouchID':
      return 'Touch ID';
    case 'Biometrics':
      return 'Biometrics';
    default:
      return 'Biometric Authentication';
  }
};
