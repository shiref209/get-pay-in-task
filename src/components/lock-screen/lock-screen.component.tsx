import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  authenticateWithBiometrics,
  checkBiometricAvailability,
  getBiometryTypeName,
} from '../../utils/biometric.util';
import { getToken } from '../../utils/token.util';
import { fontSize, height, width } from '@src/utils';

interface LockScreenProps {
  onUnlock: () => void;
  onLogout: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  onUnlock,
  onLogout,
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [biometryType, setBiometryType] = useState<string>(
    'Biometric Authentication',
  );
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    initBiometrics();
  }, []);

  const initBiometrics = async () => {
    const { isAvailable, biometryType: type } =
      await checkBiometricAvailability();
    setBiometricAvailable(isAvailable);
    if (type) {
      setBiometryType(getBiometryTypeName(type));
    }
  };

  const handleBiometricAuth = async () => {
    if (isAuthenticating || isUnlocking) {
      return;
    }

    setIsAuthenticating(true);
    try {
      const success = await authenticateWithBiometrics(
        `Use ${biometryType} to unlock`,
      );
      if (success) {
        setIsUnlocking(true);
        setTimeout(() => {
          onUnlock();
        }, 100);
      } else {
        Alert.alert(
          'Authentication Failed',
          'Would you like to try again or logout?',
          [
            { text: 'Try Again', onPress: handleBiometricAuth },
            {
              text: 'Logout',
              onPress: onLogout,
              style: 'destructive',
            },
          ],
        );
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handlePasswordFallback = () => {
    if (isUnlocking) {
      return;
    }

    Alert.prompt(
      'Enter Password',
      'Enter your password to unlock',
      async (password: string) => {
        if (isUnlocking) {
          return;
        }

        const token = await getToken('access');
        if (token && password.length > 0) {
          setIsUnlocking(true);
          setTimeout(() => {
            onUnlock();
          }, 100);
        } else {
          Alert.alert('Error', 'Invalid password', [
            { text: 'Try Again', onPress: handlePasswordFallback },
            { text: 'Logout', onPress: onLogout, style: 'destructive' },
          ]);
        }
      },
      'secure-text',
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>

        <Text style={styles.title}>App Locked</Text>
        <Text style={styles.subtitle}>
          {biometricAvailable
            ? `Unlock with ${biometryType}`
            : 'Unlock to continue'}
        </Text>

        {isAuthenticating ? (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.loader}
          />
        ) : (
          <View style={styles.buttonContainer}>
            {biometricAvailable && (
              <TouchableOpacity
                style={styles.biometricButton}
                onPress={handleBiometricAuth}
              >
                <Text style={styles.biometricButtonText}>
                  Unlock with {biometryType}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.passwordButton}
              onPress={handlePasswordFallback}
            >
              <Text style={styles.passwordButtonText}>Use Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: width(20),
  },
  iconContainer: {
    marginBottom: height(30),
  },
  lockIcon: {
    fontSize: fontSize(80),
  },
  title: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: height(10),
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#666666',
    marginBottom: height(40),
    textAlign: 'center',
  },
  loader: {
    marginVertical: height(30),
  },
  buttonContainer: {
    width: '100%',
    maxWidth: width(300),
  },
  biometricButton: {
    backgroundColor: '#007AFF',
    paddingVertical: height(16),
    paddingHorizontal: width(24),
    borderRadius: width(12),
    marginBottom: height(12),
    alignItems: 'center',
  },
  biometricButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  passwordButton: {
    backgroundColor: '#F2F2F7',
    paddingVertical: height(16),
    paddingHorizontal: width(24),
    borderRadius: width(12),
    marginBottom: height(12),
    alignItems: 'center',
  },
  passwordButtonText: {
    color: '#007AFF',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  logoutButton: {
    paddingVertical: height(16),
    paddingHorizontal: width(24),
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: fontSize(16),
    fontWeight: '500',
  },
});
