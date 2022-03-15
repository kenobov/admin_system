export type orderStatusType = {
    id: number,
    text: string,
    color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

const orderStatus: orderStatusType[] = [
    {
        id: 1,
        text: "В работе",
        color: "warning"
    },
    {
        id: 2,
        text: "На паузе",
        color: "error"
    },
    {
        id: 3,
        text: "На уточнении",
        color: "primary"
    },
    {
        id: 5,
        text: "Готов",
        color: "info"
    },
    {
        id: 6,
        text: "Отгружен",
        color: "success"
    }
]

export default orderStatus;