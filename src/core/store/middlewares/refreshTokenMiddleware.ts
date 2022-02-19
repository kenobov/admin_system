import {Middleware} from 'redux';
import {RootStateType} from "../reducers";
import {authModel} from "../../models/auth.model";
import ApiAuthService from "../../services/ApiAuthService";
import {AUTH_LOGIN_FAIL, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT} from "../actions/auth/types";
import authHeader from "../../utils/authHeader";

const refreshTokenMiddleware: Middleware<{}, RootStateType> =
    ({dispatch}) => next => action => {

        if (typeof action === 'function') {
            const timeStamp = Math.floor(Date.now() / 1000);
            const tokenStorage = localStorage.getItem('token')
            if (tokenStorage) {
                const token = <authModel>JSON.parse(tokenStorage);
                if (token && token.expires) {
                    const expiration = +token.expires;
                    if (expiration && timeStamp > expiration) {
                        console.log('TOKEN REFRESHING')

                        return ApiAuthService.refresh()
                            .then((data) => {
                                console.log(data)
                                return next(action);
                            })
                            .catch((e) => {
                                console.log(e)
                                dispatch({
                                    type: AUTH_LOGIN_FAIL,
                                    message: "Не удалось обновить токен"
                                });
                            })
                    }
                }
            }
        }
        return next(action);
    }

// export const refreshTokenMiddleware: Middleware<{}, RootStateType> = ({ dispatch}) => {
//
//     return (next) => (action) => {
//
//         if (typeof action === 'function') {
//             console.log(action);
//             const timeStamp = Math.floor(Date.now() / 1000);
//             const tokenStorage = localStorage.getItem('token')
//             let token = tokenStorage ? <authModel>JSON.parse(tokenStorage) : null;
//
//             if (token) {
//                 const expiration = token ? +token.expires : null;
//                     if (expiration && expiration > timeStamp) {
//                         console.log('TOKEN REFRESHING')
//                         return ApiAuthService.refresh()
//                             .then(() => next(action))
//                             .catch(() => {
//                                 dispatch({
//                                     type: AUTH_LOGIN_FAIL,
//                                     message: "Не удалось обновить токен"
//                                 });
//                             });
//                     }
//             }
//         }
//         return next(action);
//     };
// }

export default refreshTokenMiddleware;