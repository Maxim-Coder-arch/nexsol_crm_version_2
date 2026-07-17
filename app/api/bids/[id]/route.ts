import createRoute from '@/helpers/createRoute';

const patchRoute = createRoute({
    collectionName: "leads",
    allowedRoles: ['director', 'moderator'],
});

const deleteRoute = createRoute({
    collectionName: "leads",
    allowedRoles: ['director'],
});

export const PATCH = patchRoute.PATCH;
export const DELETE = deleteRoute.DELETE;