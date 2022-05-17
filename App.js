import React from 'react';
import MyRouter from './MyRouter'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <MyRouter />
      <Toast />
    </Provider>
  );
}
