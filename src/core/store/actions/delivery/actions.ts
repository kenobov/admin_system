import {Dispatch} from "react";
import {Action, ActionCreator} from "redux";
import {AxiosError, AxiosResponse} from "axios";
import {deliveryModel} from "../../../models/delivery.model";
import {ApiDeliveryService} from "../../../services/ApiDeliveryService";

import {
    SINGLE_DELIVERY_GET_SUCCESS,
    SINGLE_DELIVERY_GET_FAIL,
    SINGLE_DELIVERY_SAVE_SUCCESS,
    SINGLE_DELIVERY_SAVE_FAIL,
    SINGLE_DELIVERY_LOADING_FINISH,
    SINGLE_DELIVERY_LOADING_START
} from "./types";

export type deliveryActionType = {
    type: typeof SINGLE_DELIVERY_GET_SUCCESS |
        typeof SINGLE_DELIVERY_GET_FAIL |
        typeof SINGLE_DELIVERY_LOADING_FINISH |
        typeof SINGLE_DELIVERY_LOADING_START,
    delivery?: deliveryModel,
    message?: string | null,
    loading?: boolean
}

export const deliveryGetSuccess: ActionCreator<Action> = (count: number, delivery:deliveryModel) => ({
    type: SINGLE_DELIVERY_GET_SUCCESS,
    delivery,
    message: null
} as const);

export const deliveryGetFail: ActionCreator<Action> = (message = null) => ({
    type: SINGLE_DELIVERY_GET_FAIL,
    message: message ?? 'Не удалось загрузить заказ'
} as const);

export const getDelivery = (id:number) => {

    return async (dispatch: Dispatch<deliveryActionType>): Promise<any> => {
        dispatch({
            type: SINGLE_DELIVERY_LOADING_START
        })

        return await ApiDeliveryService.getDelivery(id)
            .then((response) => {
                dispatch({
                    type: SINGLE_DELIVERY_GET_SUCCESS,
                    delivery: response.data,
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
                    type: SINGLE_DELIVERY_GET_FAIL,
                    message
                });
                return Promise.reject();
            })
            .finally(() => {
                dispatch({
                    type: SINGLE_DELIVERY_LOADING_FINISH
                })
            })

    }

}
