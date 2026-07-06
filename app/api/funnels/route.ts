import createRoute from "@/helpers/createRoute";

const route = createRoute({
    collectionName: "funnels",
    transformCreate: (data) => ({
        title: data.title,
        type: data.type,
        items: data.items || [
            { id: '1', title: 'Шаг 1', type: 'TOFU' },
            { id: '2', title: 'Шаг 2', type: 'MOFU' },
            { id: '3', title: 'Шаг 3', type: 'BOFU' },
        ],
    }),
    transformResponse: (data) => ({
        ...data,
        items: data.items || [],
    }),
});

export const GET = route.GET;
export const POST = route.POST;