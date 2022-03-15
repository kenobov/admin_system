export interface invoicesModel {
    id: number,
    number: number,
    when: string,
    base: string | null,
    props_provider: string | null,
    props_client: string | null,
    order: string | null,
    info: string | null,
    total: number,
    sum: number,
    sum_paid: number,
    key: string | null,
    shipment: number,
    pay_type: 'all' | 'bank',
    progress: number,
    originals: 0 | 1,
    is_canceled: 0 | 1,
    contract_id: number
    client_id: number,
    production_id: number,
    user_id: number,
    percent: number,

    display_name?: string,
    unp?: string | null,
    orders?: number
}
