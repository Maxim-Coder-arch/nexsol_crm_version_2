import { IMenu } from "@/types/menu.type";

const menuItems: IMenu[] = [
    {
        label: "Главная",
        link: "/",
    },
    {
        label: "Заявки",
        link: "/dashboard/bids",
    },
    {
        label: "Отзывы",
        link: "/dashboard/reviews",
    },
    {
        label: "Клиенты",
        link: "/dashboard/clients",
    },
]

export { menuItems };