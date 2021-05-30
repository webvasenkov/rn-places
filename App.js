import React from 'react';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { init } from './src/helpers/db';
import PlacesNavigator from './src/navigation/PlacesNavigator';

init()
  .then(() => console.log('Database initialized'))
  .catch(() => console.log('Database is not initialized'));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
