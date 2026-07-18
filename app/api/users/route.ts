import createRoute from "@/helpers/global/createRoute";
import { hashPassword } from "@/lib/password";

const getRoute = createRoute({
    collectionName: "users",
    allowedRoles: ["director", "moderator"],
    transformResponse: (data) => {
        const { password, ...rest } = data;
        return rest;
    },
});

const postRoute = createRoute({
    collectionName: "users",
    allowedRoles: ["director"],
    transformCreate: async (data) => ({
        name: data.name,
        email: data.email,
        password: await hashPassword(data.password),
        role: data.role || 'viewer',
        specialties: data.specialties || [],
        responsibilities: data.responsibilities || [],
    }),
    transformResponse: (data) => {
        const { password, ...rest } = data;
        return rest;
    },
});

export const GET = getRoute.GET;
export const POST = postRoute.POST;