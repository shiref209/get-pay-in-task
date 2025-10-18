import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@src/navigation';

/**
 * Reference to the root navigation container.
 * This allows navigation actions to be dispatched from outside of React components.
 */
let navigationRef: NavigationContainerRef<RootStackParamList> | null = null;

/**
 * Sets the navigation container reference for global navigation access.
 * This should be called once when the NavigationContainer mounts.
 *
 * @param ref - The navigation container ref from React Navigation
 *
 * @example
 * ```tsx
 * <NavigationContainer ref={setNavigationRef}>
 *   <RootNavigator />
 * </NavigationContainer>
 * ```
 */
export function setNavigationRef(
  ref: NavigationContainerRef<RootStackParamList> | null,
) {
  navigationRef = ref;
}

/**
 * Navigates to a specific screen in the navigation stack.
 * This function can be called from anywhere in the app, including outside React components.
 *
 * @template T - The route name type from RootStackParamList
 * @param routeName - The name of the screen to navigate to
 * @param params - Optional parameters to pass to the screen (type-safe based on route)
 *
 * @example
 * ```ts
 * // Navigate without params
 * navigateToScreen('Home');
 *
 * // Navigate with params
 * navigateToScreen('Details', { id: '123' });
 * ```
 *
 * @remarks
 * The navigation action will only be dispatched if the navigation container is ready.
 * If the container is not ready, the navigation request will be silently ignored.
 */
export function navigateToScreen<T extends keyof RootStackParamList>(
  routeName: T,
  params?: RootStackParamList[T],
) {
  if (navigationRef?.isReady()) {
    (navigationRef as any).navigate(routeName, params);
  }
}
