import {authModel} from "../models/auth.model";
import {AxiosRequestHeaders} from "axios";

const headers = {
    'Accept': 'application/json'
}

export default function authHeader():AxiosRequestHeaders {
    const token:authModel = JSON.parse(localStorage.getItem('token') || '');
    if (token && token.access_token) {
        return {
            ...headers,
            Authorization: 'Bearer ' + token.access_token
        };
    } else {
        return headers;
    }
}