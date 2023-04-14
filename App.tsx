
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Main from './src/navigation/Main';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
