import {orderPackModel} from "./orderPack.model";

export interface deliveryModel {
    id: number,
    address: string | null,
    production: 'delivery' | 'pickup',
    date: string | null,
    day: 1 | 2,
    comment: string | null,
    transferred: string,
    received: string,
    shipped: string,
    courier_id: number,
    client_id: number,

    name?: string, // client name
    display_name?: string, // client display name
    courier?: string // user name,
    packs?: orderPackModel[]
}
