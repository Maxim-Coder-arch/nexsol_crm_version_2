import createRoute from '@/helpers/createRoute';

const getRoute = createRoute({
    collectionName: "reviews",
})

const postRoute = createRoute({
    collectionName: "reviews",
    allowedRoles: ["director", "manager"]
})

export const GET = getRoute.GET;
export const POST = postRoute.POST;