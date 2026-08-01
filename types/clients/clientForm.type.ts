import { Dispatch, SetStateAction } from "react";
import { IAdditionalDataField, IClient, IStatusOption } from "./common.type";

export interface ClientFormState {
    name: string;
    workStatus: IClient["workStatus"];
    physicalStatus: IClient["physicalStatus"];
    comment: string;
    additionalData: IAdditionalDataField[];
}

export interface ClientFormActions {
    setName: Dispatch<SetStateAction<string>>;
    setWorkStatus: Dispatch<SetStateAction<IClient["workStatus"]>>;
    setPhysicalStatus: Dispatch<SetStateAction<IClient["physicalStatus"]>>;
    setComment: Dispatch<SetStateAction<string>>;
    setAdditionalData: Dispatch<SetStateAction<IAdditionalDataField[]>>;

    handleAddField(): void;
    handleRemoveField(index: number): void;
    handleFieldChange(
        index: number,
        field: "key" | "value",
        value: string
    ): void;

    handleSubmit(e: React.FormEvent): void;
}

export interface ClientFormProps {
    initialData?: ClientFormState;

    workStatuses: readonly IStatusOption[];
    physicalStatuses: readonly IStatusOption[];

    form: ClientFormState;
    actions: ClientFormActions;

    onCancel(): void;
}