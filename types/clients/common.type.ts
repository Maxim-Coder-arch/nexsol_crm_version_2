export interface IStatusOption {
    value: string;
    label: string;
}

export interface IAdditionalDataField {
    key: string;
    value: string;
}

export interface IClient {
    _id: string;
    name: string;
    workStatus: "new" | "inProgress" | "completed";
    physicalStatus: "successful" | "lost";
    comment: string;
    additionalData: IAdditionalDataField[];
    createdAt: string;
    updatedAt: string;
}

export type WorkStatus = IClient['workStatus'];
export type PhysicalStatus = IClient['physicalStatus'];