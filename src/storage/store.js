import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {inKartReducer} from './reducer';

//redux persist config
const persistConfig = {
  key: 'InKart',
  storage: AsyncStorage,
};

//middleware:Redux persist persisted reducer
const persistedReducer = persistReducer(persistConfig, inKartReducer);

// persistReducer is a tool in Redux that helps you save and
// load the state of your app even after it's closed and reopened.

//redux:store

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// immutableCheck ensures that you're treating your state immutably,
// and serializableCheck ensures that your actions and state can be easily
//  converted to a format that's useful for various tasks like persistence
//   and network communication.

//middleware:Redux persist persister
let persister = persistStore(store);
//export
export {store, persister};
