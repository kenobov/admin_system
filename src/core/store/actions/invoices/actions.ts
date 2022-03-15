import {Dispatch} from "react";
import {Action, ActionCreator} from "redux";
import {AxiosError} from "axios";

import {INVOICES_GET_FAIL, INVOICES_GET_SUCCESS, INVOICES_LOADING_END, INVOICES_LOADING_START} from "./types";
import ApiInvoiceService from "../../../services/ApiInvoiceService";
import {invoicesModel} from "../../../models/invoices.model";

export type invoicesActionType = {
    type: typeof INVOICES_GET_SUCCESS |
        typeof INVOICES_GET_FAIL |
        typeof INVOICES_LOADING_START |
        typeof INVOICES_LOADING_END,
    count?: number,
    invoices?: invoicesModel[],
    message?: string | null,
    loading?: boolean
}

export const invoicesGetSuccess: ActionCreator<Action> = (count: number, invoices:invoicesModel[]) => ({
    type: INVOICES_GET_SUCCESS,
    count,
    invoices,
    message: null,
    loading: true
} as const);

export const invoicesGetFail: ActionCreator<Action> = (message = null) => ({
    type: INVOICES_GET_FAIL,
    message: message ?? 'Не удалось загрузить счета'
} as const);

export const invoicesLoadingStart: ActionCreator<Action> = () => ({
    type: INVOICES_LOADING_START,
    loading: true
} as const);

export const invoicesLoadingEnd: ActionCreator<Action> = () => ({
    type: INVOICES_LOADING_END,
    loading: false
} as const);

export const getInvoices = () => {

    return async (dispatch: Dispatch<invoicesActionType>): Promise<any> => {
        dispatch({
            type: INVOICES_LOADING_START
        })

        return await ApiInvoiceService.getInvoices()
            .then((response) => {
                dispatch({
                    type: INVOICES_GET_SUCCESS,
                    count: response.data.total,
                    invoices: response.data.result,
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
                    type: INVOICES_GET_FAIL,
                    message
                });
                return Promise.reject();
            })
            .finally(() => {
                dispatch({
                    type: INVOICES_LOADING_END
                })
            })

    }

}
