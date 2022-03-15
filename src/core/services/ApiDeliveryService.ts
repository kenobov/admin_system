import axios, {AxiosError, AxiosResponse} from "axios";
import { serverURI } from "../config/api.config";
import authHeader from "../utils/authHeader";
import {deliveryModel} from "../models/delivery.model";
import {limits} from "../config/api.config";
import buildUrlFromSession from "../utils/buildUrlFromSession";
import {orderCommentModel} from "../models/orderComment.model";

export const ApiDeliveryService = {

    getDeliveries() {
        const params = buildUrlFromSession('delivery');

        return axios
            .get<deliveryModel[]>(
                serverURI + `delivery?mode=prod&limit=${limits.orders ?? 50}` + params,
                {headers: authHeader()}
                )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    getDelivery(id:number) {
        return axios
            .get<deliveryModel>(
                serverURI + `delivery/${id}`,
                {headers: authHeader()}
            )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    saveDelivery(formData:FormData, id?: number) {
        return axios
            .post<orderCommentModel>(
                serverURI + `delivery${id ? `/${id}` : ''}`,
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

    saveDeliveryStatus(formData:FormData, id?: number) {
        return axios
            .post<orderCommentModel>(
                serverURI + `courier${id ? `/${id}` : ''}`,
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

}

export default ApiDeliveryService;