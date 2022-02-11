import {Dispatch, ReducerAction} from "react";
import AuthService, {IAuthService} from "../../../services/AuthService";
import {AxiosError, AxiosResponse} from "axios";
import { Action, ActionCreator } from 'redux';

import {
    AUTH_LOGIN_SUCCESS,
    AUTH_REFRESH,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT
} from './types'

import {
    APP_LOADING_START,
    APP_LOADING_FINISH
} from "../types";

export type authActionType = {
    type: typeof AUTH_LOGIN_SUCCESS |
        typeof AUTH_REFRESH |
        typeof AUTH_LOGIN_FAIL |
        typeof AUTH_LOGOUT |
        typeof APP_LOADING_START |
        typeof APP_LOADING_FINISH,
    user?: object,
    message?: string
}

export const authLogin = async (
    username: string,
    password: string
) => {
    return (dispatch: Dispatch<authActionType>): Promise<Action> => {
        dispatch({
            type: APP_LOADING_START
        })

        // @ts-ignore
        return AuthService.login(username, password).then(
            (data:AxiosResponse) => {
                dispatch({
                    type: AUTH_LOGIN_SUCCESS,
                    user: { user: data },
                });
                return Promise.resolve();
            },
            (error:AxiosError) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                dispatch({
                    type: AUTH_LOGIN_FAIL,
                    message
                });
                return Promise.reject();
            })
            .finally(() => {
                dispatch({
                    type: APP_LOADING_FINISH
                })
            })
    }
}


export const logout = () => (dispatch:Dispatch<authActionType>) => {
    // @ts-ignore
    AuthService.logout();
    dispatch({
        type: AUTH_LOGOUT,
    });
};
