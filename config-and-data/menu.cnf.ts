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
    {
        label: "Команда",
        link: "/team",
    },
    {
        label: "Проекты",
        link: "/projects",
    },
    {
        label: "Карта",
        link: "/map",
    },
]

export { menuItems };