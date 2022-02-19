import React, {Dispatch, useContext} from 'react';
import { connect } from "react-redux";
import { RootStateType } from "../core/store/reducers";
import {
    Route, Routes
} from 'react-router-dom';

import LoginPage from "../pages/LoginPage/LoginPage";
import {appLoadingFinish, appLoadingStart} from "../core/store/actions/actions";
import Loader from "./Loader/Loader";
import Orders from "../pages/Orders/Orders";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import Modal from "./Modal/Modal";
import NoData from "./NoData/NoData";

type AppProps = {
    loading: boolean,
    isLoggedIn: boolean,
    appLoadingStart: () => void,
    appLoadingFinish: () => void
}

const mapStateToProps = (state:RootStateType) => ({
    loading: state.app.loading,
    isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = {
    appLoadingStart, appLoadingFinish
}

// @ts-ignore
const App = (props: AppProps) => {

    return (
        <React.StrictMode>
            <Loader active={props.loading} />
            {
                 props.isLoggedIn && localStorage.getItem('token')
                     ? <>
                         <Sidebar />
                         <Content>
                             <Routes>
                                 <Route path="/" element={<Orders />} />
                                 <Route path="/packs" element={<NoData/>} />
                                 <Route path="/invoices" element={<NoData/>} />
                                 <Route path="/delivery" element={<NoData/>} />
                             </Routes>
                         </Content>
                       </>
                     : <LoginPage />
            }
            <Modal />
        </React.StrictMode>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);