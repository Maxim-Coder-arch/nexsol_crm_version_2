// app/api/bids/[id]/route.ts
import createRoute from '@/helpers/createRoute';

// PATCH — для изменения статуса
const patchRoute = createRoute({
    collectionName: "leads",
    allowedRoles: ['director', 'manager'],
});

// DELETE — для удаления
const deleteRoute = createRoute({
    collectionName: "leads",
    allowedRoles: ['director'],
});

export const PATCH = patchRoute.PATCH;
export const DELETE = deleteRoute.DELETE;