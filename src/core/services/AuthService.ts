import axios, {AxiosResponse, AxiosStatic} from "axios";
import { serverURI } from "../config/api.config";
import {authModel} from "../models/auth.model";
import authHeader from "../utils/authHeader";

export interface IAuthService {
    login: (username:string, password:string) => Promise<AxiosResponse>,
    logout: () => Promise<AxiosResponse>,
    refresh: () => Promise<AxiosResponse>
}

export default class AuthService implements IAuthService{

    login(username:string, password:string) {
        return axios
            .post<authModel>(serverURI + "user/login", { username, password })
            .then((response) => {
                console.log(response);
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response;
            });
    }

    logout = () => {
        return axios.post(serverURI + "user/logout", { headers: authHeader()})
            .finally(() => {
                    localStorage.removeItem("user");
                }
            )
    }

    refresh = () => {
        return axios
            .post<authModel>(serverURI + "user/refresh", { headers: authHeader()})
            .then((response:AxiosResponse) => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response;
            });
    }

}