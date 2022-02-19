import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT
} from "../actions/auth/types";

import {authActionType} from "../actions/auth/actions";
import {authModel} from "../../models/auth.model";

export interface IAuthState {
    isLoggedIn: boolean,
    token: authModel | null,
    message: string | null
}

const storeToken = localStorage.getItem("token");
const token = storeToken
    ? <authModel>JSON.parse(storeToken)
    : null;

const AuthInitState: IAuthState = token
    ? { isLoggedIn: true, token, message: null }
    : { isLoggedIn: false, token: null, message: null };

const authReducer = (
    state = AuthInitState,
    action: authActionType
) => {
    const { type, token, message } = action;
    switch (type) {
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token,
            };
        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                message
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            };
        default:
            return state;
    }
}

export default authReducer;