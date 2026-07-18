import createRoute from '@/helpers/global/createRoute';

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