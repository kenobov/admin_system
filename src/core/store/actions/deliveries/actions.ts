import {Dispatch} from "react";
import {Action, ActionCreator} from "redux";
import {AxiosError} from "axios";
import {deliveryModel} from "../../../models/delivery.model";
import ApiDeliveryService from "../../../services/ApiDeliveryService";

import {DELIVERY_GET_FAIL, DELIVERY_GET_SUCCESS} from "./types";
import {APP_LOADING_FINISH, APP_LOADING_START} from "../types";

export type deliveriesActionType = {
    type: typeof DELIVERY_GET_SUCCESS |
        typeof DELIVERY_GET_FAIL |
        typeof APP_LOADING_START |
        typeof APP_LOADING_FINISH,
    count?: number,
    deliveries?: deliveryModel[],
    message?: string | null
}

export const deliveriesGetSuccess: ActionCreator<Action> = (count: number, deliveries:deliveryModel[]) => ({
    type: DELIVERY_GET_SUCCESS,
    count,
    deliveries,
    message: null
} as const);

export const deliveriesGetFail: ActionCreator<Action> = (message = null) => ({
    type: DELIVERY_GET_FAIL,
    message: message ?? 'Не удалось загрузить список отгрузок'
} as const);

export const getDeliveries = () => {

    return async (dispatch: Dispatch<deliveriesActionType>): Promise<any> => {
        dispatch({
            type: APP_LOADING_START
        })

        return await ApiDeliveryService.getDeliveries()
            .then((response) => {
                console.log(response.data)
                dispatch({
                    type: DELIVERY_GET_SUCCESS,
                    count: response.data.total,
                    deliveries: response.data.result,
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
                    type: DELIVERY_GET_FAIL,
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
