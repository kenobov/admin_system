import React, {Dispatch} from 'react';
import { connect } from "react-redux";
import { RootStateType } from "../core/store/reducers";

import LoginPage from "../pages/LoginPage/LoginPage";
import {appLoadingFinish, appLoadingStart} from "../core/store/actions/actions";
import Loader from "./Loader/Loader";

type AppProps = {
    loading: boolean,
    appLoadingStart: () => void,
    appLoadingFinish: () => void
}

const mapStateToProps = (state:RootStateType) => ({
    loading: state.app.loading
})

const mapDispatchToProps = {
    appLoadingStart, appLoadingFinish
}


const App = (props: AppProps) => {
    React.useEffect(() => {
        setTimeout(props.appLoadingFinish, 500)
    },[])

    return (
        <React.StrictMode>
            <Loader active={props.loading} />
            <LoginPage />
        </React.StrictMode>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);