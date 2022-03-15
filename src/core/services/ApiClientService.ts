import axios, {AxiosError, AxiosResponse} from "axios";
import { serverURI } from "../config/api.config";
import authHeader from "../utils/authHeader";
import {clientsModel} from "../models/clients.model";
import {limits} from "../config/api.config";
import buildUrlFromSession from "../utils/buildUrlFromSession";

export const ApiClientService = {

    getClients() {
        const params = buildUrlFromSession('clients');
        return axios
            .get<clientsModel[]>(
                serverURI + `clients?limit=${limits.clients ?? 50}&order=orders` + params,
                {headers: authHeader()}
                )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    getClient(id:number) {
        return axios
            .get<clientsModel>(
                serverURI + `clients/${id}`,
                {headers: authHeader()}
                )
            .then((response:AxiosResponse) => {
                return response;
            });
    }

}

export default ApiClientService;