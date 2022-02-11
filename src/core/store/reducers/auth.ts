import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT,
    AUTH_REFRESH
} from "../actions/auth/types";

import {authActionType} from "../actions/auth/actions";
import {authModel} from "../../models/auth.model";

export interface IAuthState {
    isLoggedIn: boolean,
    user: authModel | null,
    message: string | null
}

const storeUser = localStorage.getItem("user");
const user = storeUser
    ? <authModel>JSON.parse(storeUser)
    : null;

const AuthInitState: IAuthState = user
    ? { isLoggedIn: true, user, message: null }
    : { isLoggedIn: false, user: null, message: null };

const authReducer = (
    state = AuthInitState,
    action: authActionType
) => {
    const { type, user, message } = action;
    switch (type) {
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user,
            };
        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                message
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
}

export default authReducer;