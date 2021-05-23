import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import PlacesNavigator from './navigation/PlacesNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
