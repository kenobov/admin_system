export interface clientsModel {
    id: number,
    display_name: string,
    type: 'entity' | 'individual',
    name: string,
    address: string | null,
    address_post: string | null,
    unp: string | null,
    orders?: number
}
