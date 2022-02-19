import {
    SINGLE_ORDER_GET_SUCCESS,
    SINGLE_ORDER_GET_FAIL,
    SINGLE_ORDER_LOADING_FINISH,
    SINGLE_ORDER_LOADING_START
} from "../actions/order/types";

import {ordersModel} from "../../models/orders.model";
import {orderActionType} from "../actions/order/actions";

export interface IOrderState {
    loading: boolean,
    order: ordersModel | null,
    message: string | null
}

const OrderInitState: IOrderState = {
    order: null,
    loading: false,
    message: null
}

const orderReducer = (
    state = OrderInitState,
    action: orderActionType
) => {
    switch (action.type) {
        case SINGLE_ORDER_GET_SUCCESS:
            return {
                ...state,
                order: action.order
            };
        case SINGLE_ORDER_GET_FAIL:
            return {
                ...state,
                message: action.message
            };
        case SINGLE_ORDER_LOADING_START:
            return {
                ...state,
                loading: true
            };
        case SINGLE_ORDER_LOADING_FINISH:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default orderReducer;