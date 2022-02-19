import {Dispatch} from "react";
import {Action, ActionCreator} from "redux";
import {AxiosError, AxiosResponse} from "axios";
import {ordersModel} from "../../../models/orders.model";
import {ApiOrderService} from "../../../services/ApiOrderService";

import {ORDERS_GET_FAIL, ORDERS_GET_SUCCESS} from "./types";
import {APP_LOADING_FINISH, APP_LOADING_START} from "../types";

export type ordersActionType = {
    type: typeof ORDERS_GET_SUCCESS |
        typeof ORDERS_GET_FAIL |
        typeof APP_LOADING_START |
        typeof APP_LOADING_FINISH,
    count?: number,
    orders?: ordersModel[],
    message?: string | null
}

export const ordersGetSuccess: ActionCreator<Action> = (count: number, orders:ordersModel[]) => ({
    type: ORDERS_GET_SUCCESS,
    count,
    orders,
    message: null
} as const);

export const ordersGetFail: ActionCreator<Action> = (message = null) => ({
    type: ORDERS_GET_FAIL,
    message: message ?? 'Не удалось загрузить заказы'
} as const);

export const getOrders = () => {

    return async (dispatch: Dispatch<ordersActionType>): Promise<any> => {
        console.log('GET_ORDERS')
        dispatch({
            type: APP_LOADING_START
        })

        return await ApiOrderService.getOrders()
            .then((response) => {
                dispatch({
                    type: ORDERS_GET_SUCCESS,
                    count: response.data.total,
                    orders: response.data.result,
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
                    type: ORDERS_GET_FAIL,
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
