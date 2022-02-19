import { Middleware } from 'redux';
import { RootStateType } from "../reducers";

const loggerMiddleware:Middleware<{}, RootStateType> =
    () => next => action => {
    console.log(action)
    return next(action)
}

export default loggerMiddleware;