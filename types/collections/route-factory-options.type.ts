import { collections } from "./collections.type";

export interface RouteFactoryOptions {
    collectionName: collections;
    dbName?: string;
    transformCreate?: (data: any) => any;
    transformUpdate?: (data: any) => any;
    transformResponse?: (data: any) => any;
    allowGetAll?: boolean;
    allowCreate?: boolean;
    allowUpdate?: boolean;
    allowDelete?: boolean;
    requireAuth?: boolean;
    allowedRoles?: string[];
}