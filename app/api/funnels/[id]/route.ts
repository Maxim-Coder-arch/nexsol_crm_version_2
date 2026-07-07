import createRoute from "@/helpers/createRoute";

const patchRoute = createRoute({
    collectionName: "funnels",
    allowedRoles: ["director", "manager"],
    transformUpdate: (data) => ({
        ...data,
        items: data.items || [],
    }),
    transformResponse: (data) => ({
        ...data,
        items: data.items || [],
    }),
});

const deleteRoute = createRoute({
    collectionName: "funnels",
    allowedRoles: ["director"],
});

export const PATCH = patchRoute.PATCH;
export const DELETE = deleteRoute.DELETE;