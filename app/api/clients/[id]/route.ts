import createRoute from "@/helpers/createRoute";

const route = createRoute({
    collectionName: "clients",
    transformUpdate: (data) => ({
        ...data,
        additionalData: data.additionalData || [],
    }),
    transformResponse: (data) => ({
        ...data,
        additionalData: data.additionalData || [],
    }),
});

export const PATCH = route.PATCH;
export const DELETE = route.DELETE;