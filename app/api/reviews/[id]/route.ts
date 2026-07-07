import createRoute from '@/helpers/createRoute';

const patchRoute = createRoute({
    collectionName: "reviews",
    allowedRoles: ['director', 'manager'],
});

const deleteRoute = createRoute({
    collectionName: "reviews",
    allowedRoles: ['director'],
});

export const PATCH = patchRoute.PATCH;
export const DELETE = deleteRoute.DELETE;