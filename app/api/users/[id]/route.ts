import createRoute from "@/helpers/createRoute";
import { hashPassword } from "@/lib/password";

const route = createRoute({
    collectionName: "users",
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

export const PATCH = route.PATCH;
export const DELETE = route.DELETE;