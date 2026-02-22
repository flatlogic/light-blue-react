import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

export function createAppStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = createAppStore();

export default store;
