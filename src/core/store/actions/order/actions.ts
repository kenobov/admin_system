import {Dispatch} from "react";
import {Action, ActionCreator} from "redux";
import {AxiosError, AxiosResponse} from "axios";
import {ordersModel} from "../../../models/orders.model";
import {ApiOrderService} from "../../../services/ApiOrderService";

import {
    SINGLE_ORDER_GET_SUCCESS,
    SINGLE_ORDER_GET_FAIL,
    SINGLE_ORDER_SAVE_SUCCESS,
    SINGLE_ORDER_SAVE_FAIL,
    SINGLE_ORDER_LOADING_FINISH,
    SINGLE_ORDER_LOADING_START
} from "./types";

export type orderActionType = {
    type: typeof SINGLE_ORDER_GET_SUCCESS |
        typeof SINGLE_ORDER_GET_FAIL |
        typeof SINGLE_ORDER_LOADING_FINISH |
        typeof SINGLE_ORDER_LOADING_START,
    order?: ordersModel,
    message?: string | null,
    loading?: boolean
}

export const orderGetSuccess: ActionCreator<Action> = (count: number, order:ordersModel) => ({
    type: SINGLE_ORDER_GET_SUCCESS,
    order,
    message: null
} as const);

export const orderGetFail: ActionCreator<Action> = (message = null) => ({
    type: SINGLE_ORDER_GET_FAIL,
    message: message ?? 'Не удалось загрузить заказ'
} as const);

export const getOrder = (id:number) => {

    return async (dispatch: Dispatch<orderActionType>): Promise<any> => {
        console.log('GET_SINGLE_ORDER')
        dispatch({
            type: SINGLE_ORDER_LOADING_START
        })

        return await ApiOrderService.getOrder(id)
            .then((response) => {
                dispatch({
                    type: SINGLE_ORDER_GET_SUCCESS,
                    order: response.data.result,
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
                    type: SINGLE_ORDER_GET_FAIL,
                    message
                });
                return Promise.reject();
            })
            .finally(() => {
                dispatch({
                    type: SINGLE_ORDER_LOADING_FINISH
                })
            })

    }

}
