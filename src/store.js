import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userLogin', 'learningNotes', 'labelList', 'collectionList'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {
  learningNotes: { notes: [], currentPage: 1 },
  userLogin: { userInfo: JSON.parse(localStorage.getItem('userInfo')) || null },
  labelList: { labels: []},
  collectionList: { collections: []},
  pageFilter: { selectedCategory: 0, selectedLabels: []},
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;
