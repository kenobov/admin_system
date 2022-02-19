import axios, {AxiosError, AxiosResponse} from "axios";
import { serverURI } from "../config/api.config";
import authHeader from "../utils/authHeader";
import {ordersModel} from "../models/orders.model";
import {limits} from "../config/api.config";
import buildUrlFromSession from "../utils/buildUrlFromSession";

export const ApiClientService = {

    getClients() {
        const params = buildUrlFromSession('clients');
        return axios
            .get<ordersModel[]>(
                serverURI + `clients?limit=${limits.clients ?? 50}&order=orders` + params,
                {headers: authHeader()}
                )
            .then((response:AxiosResponse) => {
                return response;
            });
    }

}

export default ApiClientService;