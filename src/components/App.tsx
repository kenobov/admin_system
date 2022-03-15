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
import Delivery from "../pages/Delivery/Delivery";
import DeliveryForm from "./Delivery/DeliveryForm/DeliveryForm";
import Invoices from "../pages/Invoices/Invoices";

type AppProps = {
    loading: boolean,
    isLoggedIn: boolean,
    appLoadingStart: () => void,
    appLoadingFinish: () => void
}

const mapStateToProps = (state:RootStateType) => ({
    loading: state.app.loading,
    // @ts-ignore
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
                                 <Route path="/employees" element={<NoData />} />
                                 <Route path="/invoices" element={<Invoices />} />

                                 <Route path="/delivery/edit/:id" element={<DeliveryForm />} />
                                 <Route path="/delivery/new" element={<DeliveryForm />} />
                                 <Route path="/delivery/:id" element={<Delivery />} />
                                 <Route path="/delivery" element={<Delivery />} />
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