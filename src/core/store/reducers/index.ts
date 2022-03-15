import { combineReducers } from 'redux';
import { APP_LOADING_START, APP_LOADING_FINISH } from "../actions/types";
import {appLoadingActionType} from '../actions/actions';

import authReducer from "./auth";
import ordersReducer from "./orders";
import clientsReducer from "./clients";
import orderReducer from "./order";
import deliveriesReducer from "./deliveries";
import deliveryReducer from "./delivery";
import invoicesReducer from "./invoices";

export interface IAppInitState {
    loading: boolean
}

export const AppInitState:IAppInitState = {
    loading: true
};

const indexReducer = (state = AppInitState, action:appLoadingActionType) => {
    switch (action.type) {
        case APP_LOADING_START:
            return {
                ...state,
                loading: true
            }
        case APP_LOADING_FINISH:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
};

const rootReducer = combineReducers({
    app: indexReducer,
    auth: authReducer,
    order: orderReducer,
    orders: ordersReducer,
    clients: clientsReducer,
    invoices: invoicesReducer,
    delivery: deliveryReducer,
    deliveries: deliveriesReducer
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;