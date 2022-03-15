export interface orderCommentModel {
    id?: number,
    name?: string,
    comment: string,
    type: 1 | 2 | 3 | 0,
    order_id?: number
}
