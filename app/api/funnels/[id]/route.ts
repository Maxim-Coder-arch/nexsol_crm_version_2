import createRoute from "@/helpers/createRoute";

const route = createRoute({
    collectionName: "funnels",
    transformUpdate: (data) => ({
        ...data,
        items: data.items || [],
    }),
    transformResponse: (data) => ({
        ...data,
        items: data.items || [],
    }),
});

export const PATCH = route.PATCH;
export const DELETE = route.DELETE;