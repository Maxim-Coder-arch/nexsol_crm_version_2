import createRoute from "@/helpers/createRoute";

const patchRoute = createRoute({
    collectionName: "clients",
    allowedRoles: ["director"],
    transformUpdate: (data) => ({
        ...data,
        additionalData: data.additionalData || [],
    }),
    transformResponse: (data) => ({
        ...data,
        additionalData: data.additionalData || [],
    }),
});

const deleteRoute = createRoute({
    collectionName: "clients",
    allowedRoles: ["director"],
});

export const PATCH = patchRoute.PATCH;
export const DELETE = deleteRoute.DELETE;