import {authModel} from "../models/auth.model";
import {AxiosRequestHeaders} from "axios";

export default function authHeader():AxiosRequestHeaders {
    const user:authModel = JSON.parse(localStorage.getItem('user') || '');
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {};
    }
}