import {createStore, compose, applyMiddleware} from 'redux';
// Import thunk middleware
import thunk from 'redux-thunk';
import reducer from '../reducer';

export default function configureStore(initialState) {
  return createStore(reducer, initialState,
    // Apply to store
    applyMiddleware(thunk)
  );
}
