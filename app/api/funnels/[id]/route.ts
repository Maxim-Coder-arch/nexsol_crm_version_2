import createRoute from "@/helpers/global/createRoute";

const patchRoute = createRoute({
    collectionName: "funnels",
    allowedRoles: ["director", "moderator"],
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