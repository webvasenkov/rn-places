import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import placesReducer from './reducers/placesReducer';

const rootReducer = combineReducers({
  places: placesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
