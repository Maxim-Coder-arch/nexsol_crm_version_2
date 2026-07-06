import createRoute from "@/helpers/createRoute";
import { IClient } from "@/types/clients/client.type";

const route = createRoute({
    collectionName: "clients",
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

export const GET = route.GET;
export const POST = route.POST;