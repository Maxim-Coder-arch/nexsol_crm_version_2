import createRoute from "@/helpers/createRoute";

const route = createRoute({
    collectionName: "services",
    allowedRoles: ["director", "moderator"]
});

export const PATCH = route.PATCH;
export const DELETE = route.DELETE;