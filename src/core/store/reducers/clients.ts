import {
    CLIENTS_GET_FAIL,
    CLIENTS_GET_SUCCESS,
    CLIENTS_LOADING_END,
    CLIENTS_LOADING_START
} from "../actions/clients/types";

import {clientsModel} from "../../models/clients.model";
import {clientsActionType} from "../actions/clients/actions";

export interface IClientState {
    count: number,
    clients: clientsModel[] | null,
    message: string | null
}

const ClientsInitState: IClientState = {
    clients: [],
    count: 0,
    message: null
}

const clientsReducer = (
    state = ClientsInitState,
    action: clientsActionType
) => {
    switch (action.type) {
        case CLIENTS_GET_SUCCESS:
            return {
                ...state,
                count: action.count,
                clients: action.clients
            };
        case CLIENTS_GET_FAIL:
            return {
                ...state,
                count: 0,
                clients: [],
                message: action.message
            };
        case CLIENTS_LOADING_START:
            return {
                ...state,
                loading: true
            };
        case CLIENTS_LOADING_END:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default clientsReducer;