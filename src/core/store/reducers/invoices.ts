import {
    INVOICES_GET_FAIL,
    INVOICES_GET_SUCCESS,
    INVOICES_LOADING_END,
    INVOICES_LOADING_START
} from "../actions/invoices/types";

import {invoicesModel} from "../../models/invoices.model";
import {invoicesActionType} from "../actions/invoices/actions";

export interface IInvoiceState {
    count: number,
    invoices: invoicesModel[] | null,
    message: string | null
}

const InvoicesInitState: IInvoiceState = {
    invoices: [],
    count: 0,
    message: null
}

const invoicesReducer = (
    state = InvoicesInitState,
    action: invoicesActionType
) => {
    switch (action.type) {
        case INVOICES_GET_SUCCESS:
            return {
                ...state,
                count: action.count,
                invoices: action.invoices
            };
        case INVOICES_GET_FAIL:
            return {
                ...state,
                count: 0,
                invoices: [],
                message: action.message
            };
        case INVOICES_LOADING_START:
            return {
                ...state,
                loading: true
            };
        case INVOICES_LOADING_END:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default invoicesReducer;