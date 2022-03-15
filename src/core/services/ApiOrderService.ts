import axios, {AxiosError, AxiosResponse} from "axios";
import { serverURI } from "../config/api.config";
import authHeader from "../utils/authHeader";
import {ordersModel} from "../models/orders.model";
import {limits} from "../config/api.config";
import buildUrlFromSession from "../utils/buildUrlFromSession";
import {orderCommentModel} from "../models/orderComment.model";

export const ApiOrderService = {

    getOrders() {
        const params = buildUrlFromSession('orders');
        console.log(params)
        return axios
            .get<ordersModel[]>(
                serverURI + `orders?mode=prod&limit=${limits.orders ?? 50}` + params,
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

    getOrderComments(id:number) {
        return axios
            .get<ordersModel>(
                serverURI + `order_comments/${id}`,
                {headers: authHeader()}
            )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    saveOrderComment(formData:FormData, id?: number) {
        return axios
            .post<orderCommentModel>(
                serverURI + `orders_comments${id ? `/${id}` : ''}`,
                formData,
                {headers: authHeader()}
                )
            .then((response:AxiosResponse) => {
                return response;
            })
            .catch((e:AxiosError) => {
                throw e;
            });
    },

    getOrderPacks(id?:number | null, query?: string | null) {
        return axios
            .get<ordersModel>(
                serverURI + `order_packs?mode=prod${id ? `&order_id=${id}` : ''}${query ? query : ''}`,
                {headers: authHeader()}
            )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    saveOrderPack(formData:FormData, id?: number | null) {
        return axios
            .post<orderCommentModel>(
                serverURI + `order_packs${id ? `/${id}` : ''}`,
                formData,
                {headers: authHeader()}
            )
            .then((response:AxiosResponse) => {
                return response;
            })
            .catch((e:AxiosError) => {
                throw e;
            });
    },

    saveOrder() {

    }
}

export default ApiOrderService;