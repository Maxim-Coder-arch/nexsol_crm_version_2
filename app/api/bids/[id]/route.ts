import createRoute from '@/helpers/createRoute';

const route = createRoute({
    collectionName: "leads"
});

export const PATCH = route.PATCH;
export const DELETE = route.DELETE;