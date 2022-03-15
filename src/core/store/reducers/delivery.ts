import {
    SINGLE_DELIVERY_GET_SUCCESS,
    SINGLE_DELIVERY_GET_FAIL,
    SINGLE_DELIVERY_LOADING_FINISH,
    SINGLE_DELIVERY_LOADING_START
} from "../actions/delivery/types";

import {deliveryActionType} from "../actions/delivery/actions";
import {deliveryModel} from "../../models/delivery.model";

export interface IDeliveryState {
    loading: boolean,
    delivery: deliveryModel | null,
    message: string | null
}

const DeliveryInitState: IDeliveryState = {
    delivery: null,
    loading: false,
    message: null
}

const deliveryReducer = (
    state = DeliveryInitState,
    action: deliveryActionType
) => {
    switch (action.type) {
        case SINGLE_DELIVERY_GET_SUCCESS:
            return {
                ...state,
                delivery: action.delivery
            };
        case SINGLE_DELIVERY_GET_FAIL:
            return {
                ...state,
                message: action.message
            };
        case SINGLE_DELIVERY_LOADING_START:
            return {
                ...state,
                loading: true
            };
        case SINGLE_DELIVERY_LOADING_FINISH:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default deliveryReducer;