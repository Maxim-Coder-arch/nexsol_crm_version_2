import createRoute from "@/helpers/createRoute";
import { hashPassword } from "@/lib/password";

const patchRoute = createRoute({
    collectionName: "users",
    allowedRoles: ["director"],
    transformUpdate: async (data) => {
        const updateData: any = { ...data };
        if (data.password) {
            updateData.password = await hashPassword(data.password);
        }
        return updateData;
    },
    transformResponse: (data) => {
        const { password, ...rest } = data;
        return rest;
    },
});

const deleteRoute = createRoute({
    collectionName: "users",
    allowedRoles: ["director"],
});

export const PATCH = patchRoute.PATCH;
export const DELETE = deleteRoute.DELETE;