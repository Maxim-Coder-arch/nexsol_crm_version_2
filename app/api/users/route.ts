import createRoute from "@/helpers/createRoute";
import { hashPassword } from "@/lib/password";

const route = createRoute({
    collectionName: "users",
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

export const GET = route.GET;
export const POST = route.POST;