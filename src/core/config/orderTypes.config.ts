export type orderTypesType = {
    name: string,
    translate: string
}

const orderTypes: orderTypesType[] = [
    {
        name: "blanks",
        translate: "Бланки"
    },
    {
        name: "books",
        translate: "Книги"
    },
    {
        name: "calendars",
        translate: "Календари"
    },
    {
        name: "journals",
        translate: "Журналы"
    },
    {
        name: "notebooks",
        translate: "Блокноты"
    },
    {
        name: "certificates",
        translate: "Удостоверения"
    },
    {
        name: "folders",
        translate: "Папки"
    },
    {
        name: "store",
        translate: "Склад"
    },
]

export default orderTypes;