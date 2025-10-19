import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  AppState,
  AppStateStatus,
  PanResponder,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { isBiometricAuthEnabled } from '../utils/biometric.util';
import { RootState } from '@src/store';

interface BiometricLockContextType {
  isLocked: boolean;
  lockApp: () => void;
  unlockApp: () => void;
  resetInactivityTimer: () => void;
}

const BiometricLockContext = createContext<
  BiometricLockContextType | undefined
>(undefined);

const INACTIVITY_TIMEOUT = 10000; // 10 seconds

export const BiometricLockProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLocked, setIsLocked] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  // Clear inactivity timer
  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }
  }, []);

  // Lock the app
  const lockApp = useCallback(async () => {
    const biometricEnabled = await isBiometricAuthEnabled();
    if (biometricEnabled && isAuthenticated) {
      setIsLocked(true);
      clearInactivityTimer();
    }
  }, [isAuthenticated, clearInactivityTimer]);

  // Start inactivity timer
  const startInactivityTimer = useCallback(() => {
    if (isLocked) {
      return;
    }

    clearInactivityTimer();
    inactivityTimer.current = setTimeout(async () => {
      const biometricEnabled = await isBiometricAuthEnabled();
      if (biometricEnabled && isAuthenticated) {
        setIsLocked(true);
      }
    }, INACTIVITY_TIMEOUT);
  }, [isAuthenticated, isLocked, clearInactivityTimer]);

  // Unlock the app
  const unlockApp = useCallback(() => {
    setIsLocked(false);
    startInactivityTimer();
  }, [startInactivityTimer]);

  // Reset inactivity timer (called on user interaction)
  const resetInactivityTimer = useCallback(() => {
    if (!isLocked && isAuthenticated) {
      startInactivityTimer();
    }
  }, [isLocked, isAuthenticated, startInactivityTimer]);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      const biometricEnabled = await isBiometricAuthEnabled();

      // App going to background or inactive
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        backgroundTime.current = Date.now();
        clearInactivityTimer();

        // Lock immediately when going to background if biometric is enabled
        if (biometricEnabled && isAuthenticated) {
          setIsLocked(true);
        }
      }

      // App coming back to foreground
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (biometricEnabled && isAuthenticated) {
          // Check if app was in background for more than 10 seconds
          if (backgroundTime.current) {
            const timeInBackground = Date.now() - backgroundTime.current;
            if (timeInBackground >= INACTIVITY_TIMEOUT) {
              setIsLocked(true);
            }
          } else {
            setIsLocked(true);
          }
        }
        backgroundTime.current = null;

        // Restart inactivity timer if not locked
        if (!isLocked) {
          startInactivityTimer();
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Start inactivity timer on mount if authenticated
    if (isAuthenticated) {
      startInactivityTimer();
    }

    return () => {
      subscription.remove();
      clearInactivityTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLocked]);

  // Reset lock state when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLocked(false);
      clearInactivityTimer();
    }
  }, [isAuthenticated, clearInactivityTimer]);

  // Create PanResponder to detect user interactions
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => {
          resetInactivityTimer();
          return false;
        },
        onMoveShouldSetPanResponder: () => {
          resetInactivityTimer();
          return false;
        },
      }),
    [resetInactivityTimer],
  );

  return (
    <BiometricLockContext.Provider
      value={{ isLocked, lockApp, unlockApp, resetInactivityTimer }}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        {children}
      </View>
    </BiometricLockContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const useBiometricLock = () => {
  const context = useContext(BiometricLockContext);
  if (!context) {
    throw new Error(
      'useBiometricLock must be used within BiometricLockProvider',
    );
  }
  return context;
};
