# Trade-offs and Design Decisions

## 1. DummyJSON API Limitations

- **Trade-off**: Using a mock API means delete operations don't persist on the server
- **Impact**: After deleting a product, it will reappear on app restart or cache invalidation
- **Rationale**: DummyJSON is used for demonstration purposes; in production, a real backend would handle CRUD operations

## 2. Authentication Flow

- **Trade-off**: Tokens are stored securely but user type is in Redux state
- **Impact**: User type needs to be set manually or through API response during login
- **Rationale**: Keychain is for sensitive data (tokens), Redux for app state
- **Production consideration**: User roles should come from JWT token claims or separate API call

## 3. Offline Detection

- **Trade-off**: Network status only shows connectivity, not actual API reachability
- **Impact**: App might show "online" but API requests could still fail
- **Rationale**: NetInfo only detects device network connection
- **Enhancement**: Could add API health check for more accurate status

## 4. Loading States

- **Trade-off**: Optimistic UI updates vs showing loading states
- **Implementation**: Chose to show loading only on the specific item being modified
- **Impact**: Better UX but slightly more complex state management
- **Rationale**: Users need clear feedback on which action is in progress

## 5. Data Caching Strategy

- **Trade-off**: Persistent cache improves performance but may show stale data
- **Implementation**: React Query with MMKV persistence
- **Impact**: Fast initial loads but requires manual cache invalidation
- **Rationale**: Better offline experience and reduced API calls

---

# If I Had More Time...

## High Priority Enhancements

### 1. Comprehensive Error Handling

- **Current**: Basic error messages via toast notifications
- **Improvement**:
  - Error boundary to prevent sudden app crashes 
  - Detailed error screens with retry mechanisms
  - Error boundaries for crash recovery
  - Specific error codes and user-friendly messages
  - Sentry or similar error tracking integration

### 2. Testing Suite

- **Missing**: Unit tests, integration tests, E2E tests
- **Would Add**:
  - Jest unit tests for hooks and utilities
  - React Testing Library for component tests
  - API mocking with MSW (Mock Service Worker)

### 3. Advanced Product Features

- **Pagination Improvements**:
  - Show current page/total items
  - Jump to page functionality
  - Better loading skeleton screens

### 4. Performance Optimizations

- **Image Optimization**:
  - Use react-native-fast-image for better caching
  - Progressive image loading
- **List Performance**:
  - Virtual list optimization with FlashList
  - Memoization of components and callbacks
- **Bundle Size**:
  - Code splitting where applicable
  - Remove unused dependencies
  - Optimize asset sizes

### 5. UX/UI Enhancements

- **Better Loading States**:
  - Skeleton screens instead of spinners
  - Shimmer effects for loading cards
  - Progressive content loading
- **Animations**:
  - Animated delete actions
  - Pull-to-refresh animations
  - Toast animation improvements
- **Dark Mode Support**:
  - Complete dark theme implementation
  - Theme switching toggle
  - Persistent theme preference

### 6. Offline Mode Enhancements

- **Better Offline Experience**:
  - Queue failed requests for retry when back online
  - Conflict resolution for syncing
- **Network Indicators**:
  - More prominent offline banner
  - Show queued actions count
  - Retry failed requests button

### 8. Developer Experience

- **Documentation**:
  - Component Storybook setup
  - API documentation with examples
  - Code style guide
- **CI/CD Pipeline**:
  - Automated testing on PR
  - Build automation for iOS and Android
  - Automated deployments to TestFlight/Play Store
  - Changelog generation
- **Code Quality Tools**:
  - Husky for pre-commit hooks
  - Conventional commits enforcement

## Nice-to-Have Features

- Haptic feedback for interactions
- Advanced gesture support (swipe to delete, etc.)
