import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./core/store/store";

import App from "./components/App";

import './styles.scss';

ReactDom.render((
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    ) ,document.querySelector('#app'));