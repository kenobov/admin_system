import { createStore, applyMiddleware, Store } from "redux";

import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';

const middleware = [thunk];

const store: Store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export default store;
