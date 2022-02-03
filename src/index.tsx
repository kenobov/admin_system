import React from 'react';
import ReactDom from 'react-dom';
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

import 'bulma/css/bulma.min.css';
import './styles.scss';

ReactDom.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ) ,document.querySelector('#app'));