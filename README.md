# GetPayIn - React Native App

This is a React Native application built with TypeScript, featuring product management, authentication, and offline detection capabilities.

## Features

- 🔐 Authentication with biometric lock support
- 📦 Product listing with infinite scroll and pull-to-refresh
- 🗑️ Delete products (admin only)
- 📡 Offline detection with visual indicator
- 🎨 Category-based product filtering (Beauty products)
- 💾 Persistent data caching with React Query
- 🔒 Secure token storage with React Native Keychain

**Required:**
- Node.js >= 20
- npm or Yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Setup Steps

### 1. Clone the repository

```bash
git clone <https://github.com/shiref209/get-pay-in-task>
cd getpayin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install iOS dependencies (macOS only)

```bash
cd ios
pod install
cd ..
```

### 4. Configure environment (Optional)

The app uses DummyJSON API by default. The base URL is configured in `urls.json`:

```json
{
  "SANDBOX_URL": "https://dummyjson.com/"
}
```

## How to Run

### Start Metro Bundler

First, you will need to run **Metro**, the JavaScript build tool for React Native.

```bash
npm start
```

### Run on iOS

Open a new terminal and run:

```bash
npm run ios
```

### Run on Android

Open a new terminal and run:

```bash
npm run android
```

Make sure you have an Android emulator running or a device connected.

## Project Configuration

### Chosen Category for Specific Category Screen

The app includes a **Beauty** category screen that displays products filtered by the "beauty" category from DummyJSON API.

- **Screen**: `CategoriesScreen` (located at `src/screens/categories.screen.tsx`)
- **Category**: `beauty`
- **Navigation**: Accessible via the "Beauty" tab in the bottom navigation
- **API Endpoint**: `https://dummyjson.com/products/category/beauty`

### Superadmin User

The app uses a user type system to determine access levels for certain features (like deleting products).

**User Types Configuration:**
- Located in: `src/constants/user-types.constant.ts`
- Types available:
  - `USER = 'user'` - Regular user (read-only access)
  - `ADMIN = 'admin'` - Superadmin user (can delete products)

**Superadmin Features:**
- ✅ Can view all products
- ✅ Can delete products with confirmation dialog
- ✅ Delete button appears on each product card
- ✅ Shows loading state on the specific product being deleted
- ✅ Receives success/error notifications after deletion

**How to test as Superadmin:**

The user type is stored in Redux state after authentication. To test as a superadmin, use the user mentioned in the login screen hint.

## Key Features Documentation

### 1. Offline Detection

The app includes an offline detection feature that shows a WiFi-off icon in the app header when the device loses internet connection.

- **Component**: `AppHeader` (`src/common/app-header/app-header.common.tsx`)
- **Hook**: `useNetworkStatus` (`src/hooks/network/use-network-status.hook.ts`)
- **Library**: `@react-native-community/netinfo`
- **Visual Indicator**: WiFi icon (📶) with a red diagonal line when offline

### 2. Product Deletion

Superadmin users can delete products with the following workflow:

1. Click "Delete" button on any product card
2. Confirm deletion in the alert dialog
3. Product is deleted via API
4. Product list automatically refreshes
5. Success/error toast notification appears

**Implementation:**
- **API**: `src/api/products/delete-product.api.ts`
- **Hook**: `src/hooks/products/use-delete-product.hook.ts`
- **Component**: `ProductCard` (`src/components/products/product-card.component.tsx`)

### 3. Data Persistence

The app uses React Query with MMKV storage for persistent caching:

- **Query Client**: Configured in `src/libs/react-query/react-query.ts`
- **Storage**: React Native MMKV for fast, synchronous storage
- **Persistence**: Queries are cached and restored on app restart
- **Cache Time**: Configured per query

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator/device
- `npm run android` - Run on Android emulator/device
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Tech Stack

- **React Native** 0.82.0
- **TypeScript** 5.8.3
- **React Navigation** 7.x (Bottom Tabs + Native Stack)
- **Redux Toolkit** 2.9.0
- **React Query** 5.90.3 (TanStack Query)
- **Axios** 1.12.2
- **React Native Keychain** 10.0.0
- **React Native MMKV** 3.3.3
- **React Native NetInfo** 11.4.1
- **React Native Biometrics** 3.0.1
- **React Native Toast Message** 2.3.3

## Project Structure

```
src/
├── api/              # API calls and endpoints
│   └── products/     # Product-related APIs
├── common/           # Common/shared components (AppHeader, etc.)
├── components/       # Feature-specific UI components
│   ├── lock-screen/  # Lock screen components
│   └── products/     # Product-specific components
├── constants/        # App constants and enums
├── context/          # React contexts
├── hooks/            # Custom React hooks
│   ├── auth/         # Authentication hooks
│   ├── network/      # Network status hooks
│   └── products/     # Product hooks
├── libs/             # Third-party library configurations
│   ├── react-query/  # React Query setup
│   └── reactotron/   # Reactotron configuration
├── models/           # TypeScript interfaces and types
├── navigation/       # Navigation configuration
├── screens/          # Screen components
├── store/            # Redux store and slices
└── utils/            # Utility functions
```

## Trade-offs and Future Improvements

📄 For detailed information about design decisions, trade-offs, and planned enhancements, see **[TRADEOFFS.md](TRADEOFFS.md)**.

### Quick Summary

**Key Trade-offs:**
- Using DummyJSON (mock API) - deletes don't persist on server
- Network detection shows connectivity, not API reachability
- Persistent caching for performance vs potential stale data
- User type stored in Redux vs JWT claims

**If I Had More Time, I Would Add:**
- ✅ Comprehensive testing suite (Jest, Detox, >80% coverage)
- ✅ Advanced search and filtering capabilities
- ✅ Dark mode support with theme switching
- ✅ Better error handling with retry mechanisms
- ✅ Performance optimizations (FlashList, image optimization)
- ✅ Full offline mode with request queue and sync
- ✅ Analytics and monitoring (Firebase, Crashlytics)
- ✅ Multi-language support (i18n)
- ✅ CI/CD pipeline with automated deployments

See **[TRADEOFFS.md](TRADEOFFS.md)** for the complete list with detailed explanations.

## Troubleshooting

### iOS Pod Install Issues

If you encounter encoding errors with CocoaPods:

```bash
export LANG=en_US.UTF-8
cd ios
pod install
```

### Metro Bundler Cache Issues

Clear Metro bundler cache:

```bash
npm start -- --reset-cache
```

### Android Build Issues

Clean Android build:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Learn More

- [React Native Documentation](https://reactnative.dev)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [DummyJSON API Documentation](https://dummyjson.com/docs)
