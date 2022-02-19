export type orderStatusType = {
    id: number,
    text: string,
    color: string
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
        color: "danger"
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