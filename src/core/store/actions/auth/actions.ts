import {Dispatch} from "react";
import ApiAuthService from "../../../services/ApiAuthService";
import { AxiosError } from "axios";

import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT
} from './types'

import {
    APP_LOADING_START,
    APP_LOADING_FINISH
} from "../types";

export type authActionType = {
    type: typeof AUTH_LOGIN_SUCCESS |
        typeof AUTH_LOGIN_FAIL |
        typeof AUTH_LOGOUT |
        typeof APP_LOADING_START |
        typeof APP_LOADING_FINISH,
    token?: object,
    message?: string
}

export const authLogin = (
    email: string,
    password: string
) => {
    return async (dispatch: Dispatch<authActionType | (() => any)>): Promise<any> => {
        console.log('AUTH_LOGIN')
        dispatch({
            type: APP_LOADING_START
        })

        return await ApiAuthService.login(email, password)
            .then((data) => {
                dispatch({
                    type: AUTH_LOGIN_SUCCESS,
                    token: { token: data },
                });
                return Promise.resolve()
            })
            .catch((error:AxiosError) => {
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

export const authLogout = () => {
    return async (dispatch: Dispatch<authActionType>) => {
        dispatch({
            type: APP_LOADING_START
        })

        return await ApiAuthService.logout()
            .then((response) => {
                dispatch({
                    type: AUTH_LOGOUT
                });
                return response
            })
            .catch((e) => {
                dispatch({
                    type: AUTH_LOGOUT
                });
                throw e;
            })
            .finally(() => {
                dispatch({
                    type: APP_LOADING_FINISH
                })
            })
    }
}
