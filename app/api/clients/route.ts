import createRoute from "@/helpers/createRoute";
import { IClient } from "@/types/clients/client.type";

const getRoute = createRoute({
    collectionName: "clients",
    requireAuth: true,
    transformResponse: (data) => ({
        ...data,
        additionalData: data.additionalData || [],
    }),
});

const postRoute = createRoute({
    collectionName: "clients",
    allowedRoles: ["director", "moderator"],
    transformCreate: (data: IClient) => ({
        name: data.name,
        workStatus: data.workStatus || "new",
        physicalStatus: data.physicalStatus || "successful",
        comment: data.comment || '',
        additionalData: data.additionalData || [],
    }),
    transformResponse: (data) => ({
        ...data,
        additionalData: data.additionalData || [],
    }),
});

export const GET = getRoute.GET;
export const POST = postRoute.POST;