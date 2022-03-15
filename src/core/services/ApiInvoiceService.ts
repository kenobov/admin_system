import axios, {AxiosError, AxiosResponse} from "axios";
import { serverURI } from "../config/api.config";
import authHeader from "../utils/authHeader";
import {limits} from "../config/api.config";
import buildUrlFromSession from "../utils/buildUrlFromSession";
import {invoicesModel} from "../models/invoices.model";

export const ApiInvoiceService = {

    getInvoices() {
        const params = buildUrlFromSession('invoice');

        return axios
            .get<invoicesModel[]>(
                serverURI + `invoices?mode=prod&limit=${limits.orders ?? 50}` + params,
                {headers: authHeader()}
                )
            .then((response:AxiosResponse) => {
                return response;
            });
    },

    getInvoice(id:number) {
        return axios
            .get<invoicesModel>(
                serverURI + `invoices/${id}`,
                {headers: authHeader()}
            )
            .then((response:AxiosResponse) => {
                return response;
            });
    },


}

export default ApiInvoiceService;