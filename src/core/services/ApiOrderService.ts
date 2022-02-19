import axios, {AxiosError, AxiosResponse} from "axios";
import { serverURI } from "../config/api.config";
import authHeader from "../utils/authHeader";
import {ordersModel} from "../models/orders.model";
import {limits} from "../config/api.config";
import buildUrlFromSession from "../utils/buildUrlFromSession";

export const ApiOrderService = {

    getOrders() {
        const params = buildUrlFromSession('orders');
        return axios
            .get<ordersModel[]>(
                serverURI + `orders?limit=${limits.orders ?? 50}` + params,
                {headers: authHeader()}
                )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    getOrder(id:number) {
        return axios
            .get<ordersModel>(
                serverURI + `orders/${id}`,
                {headers: authHeader()}
            )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    saveOrder() {

    }
}

export default ApiOrderService;