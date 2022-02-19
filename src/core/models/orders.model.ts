export interface ordersModel {
    id: number,
    number: number,
    status: number,
    type: string,
    key: string | null,
    total: number,
    ready: number,
    delivered: number,
    is_urgent: number,
    deadline: string,
    invoice_id: number,
    nomenclature_id: number,
    client_id: number,
    display_name: string,
    invoice_number: number,
    name: string
}
