import { combineReducers } from 'redux';
import { APP_LOADING_START, APP_LOADING_FINISH } from "../actions/types";
import {appLoadingActionType} from '../actions/actions';

import authReducer, {IAuthState} from "./auth";

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
                loading: action.payload
            }
        case APP_LOADING_FINISH:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
};

const rootReducer = combineReducers({
    app: indexReducer,
    auth: authReducer
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;