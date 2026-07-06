import createRoute from "@/helpers/createRoute";

const route = createRoute({
    collectionName: "leads",
    transformCreate: (data) => ({
        name: data.name,
        email: data.email,
        contact: data.contact || '',
        message: data.message || '',
        source: data.source || 'manual',
        status: 'new',
    }),
});

export const GET = route.GET;
export const POST = route.POST;