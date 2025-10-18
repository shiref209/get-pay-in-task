import { combineReducers } from '@reduxjs/toolkit';
import { AuthReducer } from './slices';
// import { PersistConfig, persistReducer } from 'redux-persist';

const reducers = combineReducers({
  // internet: InternetReducer,
  auth: AuthReducer,
});

export type RootState = ReturnType<typeof reducers>;

// const persistConfig: PersistConfig<RootState> = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['lang', 'theme', 'auth', 'location', 'localCart'],
// };

// export const rootReducer = persistReducer(persistConfig, reducers);
export const rootReducer = reducers;

export type RootStore = ReturnType<typeof reducers>;
