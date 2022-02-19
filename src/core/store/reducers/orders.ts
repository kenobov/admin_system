import {ORDERS_GET_FAIL, ORDERS_GET_SUCCESS} from "../actions/orders/types";

import {ordersActionType} from "../actions/orders/actions";
import {ordersModel} from "../../models/orders.model";

export interface IOrderState {
    count: number,
    orders: ordersModel[] | null,
    message: string | null
}

const OrdersInitState: IOrderState = {
    orders: [],
    count: 0,
    message: null
}

const ordersReducer = (
    state = OrdersInitState,
    action: ordersActionType
) => {
    switch (action.type) {
        case ORDERS_GET_SUCCESS:
            return {
                ...state,
                count: action.count,
                orders: action.orders
            };
        case ORDERS_GET_FAIL:
            return {
                ...state,
                count: 0,
                orders: [],
                message: action.message
            };
        default:
            return state;
    }
}

export default ordersReducer;