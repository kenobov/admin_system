import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./core/store/store";

import App from "./components/App";
import {NotificationContainer} from 'react-notifications';


import 'bulma/css/bulma.min.css';
import 'react-notifications/lib/notifications.css';
import './styles.scss';

ReactDom.render((
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <NotificationContainer />
        </Provider>
    </BrowserRouter>
    ) ,document.querySelector('#app'));