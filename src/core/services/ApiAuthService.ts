import axios, {AxiosError, AxiosResponse, AxiosStatic} from "axios";
import { serverURI } from "../config/api.config";
import {authModel} from "../models/auth.model";
import authHeader from "../utils/authHeader";

export const ApiAuthService = {

    login(email:string, password:string) {

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        return axios
            .post<authModel>(serverURI + "user/login", formData)
            .then((response:AxiosResponse) => {
                if (response.data) {
                    localStorage.setItem("token", JSON.stringify(response.data));
                }
                return response;
            })
            .catch((e:AxiosError) => {
                throw e;
            });
    },

    logout() {
        return axios.post(serverURI + "user/logout", null,{ headers: authHeader()})
            .catch((e:AxiosError) => {
                throw e;
            })
            .finally(() => {
                localStorage.removeItem("token");
                    return Promise.resolve();
                }
            )
    },

    refresh() {
        return axios
            .post<authModel>(serverURI + "user/refresh", null,{ headers: authHeader()})
            .then((response:AxiosResponse) => {
                if (response.data) {
                    localStorage.setItem("token", JSON.stringify(response.data));
                }
                return response;
            })
            .catch((e:AxiosError) => {
                throw e;
            })
    },

    getUsers() {
        return axios
            .get<authModel>(serverURI + "users?page=1&limit=50", { headers: authHeader()})
            .then((response:AxiosResponse) => {
                return response;
            })
    }

}

export default ApiAuthService;