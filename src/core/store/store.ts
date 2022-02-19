import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from "./middlewares/loggerMiddleware";
import refreshTokenMiddleware from "./middlewares/refreshTokenMiddleware";

import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [refreshTokenMiddleware, thunk, loggerMiddleware];

const store: Store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

export default store;
