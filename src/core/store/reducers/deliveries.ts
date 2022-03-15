import {DELIVERY_GET_SUCCESS, DELIVERY_GET_FAIL} from "../actions/deliveries/types";
import {deliveryModel} from "../../models/delivery.model";
import {deliveriesActionType} from "../actions/deliveries/actions";

export interface IDeliveryState {
    count: number,
    deliveries: deliveryModel[] | null,
    message: string | null
}

const DeliveriesInitState: IDeliveryState = {
    deliveries: [],
    count: 0,
    message: null
}

const deliveriesReducer = (
    state = DeliveriesInitState,
    action: deliveriesActionType
) => {
    switch (action.type) {
        case DELIVERY_GET_SUCCESS:
            return {
                ...state,
                count: action.count,
                deliveries: action.deliveries
            };
        case DELIVERY_GET_FAIL:
            return {
                ...state,
                count: 0,
                deliveries: [],
                message: action.message
            };
        default:
            return state;
    }
}

export default deliveriesReducer;