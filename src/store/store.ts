import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { rootReducer, RootState } from './root-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { requestLocationPermissions } from '@src/store/slices';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // thunk: {
      //   extraArgument: {requestLocationPermissions},
      // },
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
});

export const persist = store;

export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;
export type AppDispatch = ThunkDispatch<RootState, AppThunk, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
