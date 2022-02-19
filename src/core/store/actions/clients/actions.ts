import {Dispatch} from "react";
import {Action, ActionCreator} from "redux";
import {AxiosError} from "axios";

import {CLIENTS_GET_FAIL, CLIENTS_GET_SUCCESS, CLIENTS_LOADING_END, CLIENTS_LOADING_START} from "./types";
import ApiClientService from "../../../services/ApiClientService";
import {clientsModel} from "../../../models/clients.model";

export type clientsActionType = {
    type: typeof CLIENTS_GET_SUCCESS |
        typeof CLIENTS_GET_FAIL |
        typeof CLIENTS_LOADING_START |
        typeof CLIENTS_LOADING_END,
    count?: number,
    clients?: clientsModel[],
    message?: string | null,
    loading?: boolean
}

export const clientsGetSuccess: ActionCreator<Action> = (count: number, clients:clientsModel[]) => ({
    type: CLIENTS_GET_SUCCESS,
    count,
    clients,
    message: null,
    loading: true
} as const);

export const clientsGetFail: ActionCreator<Action> = (message = null) => ({
    type: CLIENTS_GET_FAIL,
    message: message ?? 'Не удалось загрузить заказы'
} as const);

export const clientsLoadingStart: ActionCreator<Action> = () => ({
    type: CLIENTS_LOADING_START,
    loading: true
} as const);

export const clientsLoadingEnd: ActionCreator<Action> = () => ({
    type: CLIENTS_LOADING_END,
    loading: false
} as const);

export const getClients = () => {

    return async (dispatch: Dispatch<clientsActionType>): Promise<any> => {
        console.log('GET_CLIENTS')
        dispatch({
            type: CLIENTS_LOADING_START
        })

        return await ApiClientService.getClients()
            .then((response) => {
                dispatch({
                    type: CLIENTS_GET_SUCCESS,
                    count: response.data.total,
                    clients: response.data.result,
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
                    type: CLIENTS_GET_FAIL,
                    message
                });
                return Promise.reject();
            })
            .finally(() => {
                dispatch({
                    type: CLIENTS_LOADING_END
                })
            })

    }

}
