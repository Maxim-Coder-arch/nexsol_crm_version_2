import createRoute from "@/helpers/createRoute";

const route = createRoute({
    collectionName: "services",
    transformCreate: (data) => ({
        title: data.title,
        description: data.description || '',
        url: data.url,
        createdAt: Date.now(),
    }),
});

export const GET = route.GET;
export const POST = route.POST;