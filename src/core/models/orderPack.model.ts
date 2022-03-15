export interface orderPackModel {
    id: number,
    quantity: number,
    data: string,
    order_id: number,
    delivery_id: number,
    date?: string,
    day?: 1 | 2,
    transferred?: string,
    shipped?: string,
    order_number?: number,
    invoice_id?: number,
    invoice_number?: number,
    nomenclature_name?: string
}

export interface orderPackDataModel {
    id: number,
    p: 'pack' | 'box' | 'package',
    qa: number,
    qp: number
}