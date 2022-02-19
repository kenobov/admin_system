import { APP_LOADING_START, APP_LOADING_FINISH } from "./types";
import { Action, ActionCreator } from 'redux';

export type appLoadingActionType = {
    type: typeof APP_LOADING_FINISH | typeof APP_LOADING_START,
    payload: boolean
}


export const appLoadingStart: ActionCreator<Action> = () => ({
    type: APP_LOADING_START
} as const);

export const appLoadingFinish: ActionCreator<Action> = () => ({
    type: APP_LOADING_FINISH
} as const);