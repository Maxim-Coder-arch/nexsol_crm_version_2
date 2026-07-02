export interface IClient {
    _id: string;
    name: string;
    workStatus: "new" | "inProgress" | "completed";
    physicalStatus: "successful" | "lost";
    comment: string;
    additionalData: { key: string; value: string }[];
    createdAt: string;
    updatedAt: string;
}