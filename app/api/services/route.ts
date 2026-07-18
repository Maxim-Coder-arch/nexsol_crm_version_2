import createRoute from "@/helpers/global/createRoute";

const getRoute = createRoute({
    collectionName: "services",
    requireAuth: true,
});

const postRoute = createRoute({
    collectionName: "services",
    allowedRoles: ["director", "moderator"],
    transformCreate: (data) => ({
        title: data.title,
        description: data.description || '',
        url: data.url,
        createdAt: Date.now(),
    }),
});

export const GET = getRoute.GET;
export const POST = postRoute.POST;