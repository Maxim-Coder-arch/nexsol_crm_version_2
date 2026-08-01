import { Dispatch, SetStateAction } from "react";
import { IClient, IStatusOption } from "./common.type";
import {
    ClientFormState,
    ClientFormActions,
} from "./clientForm.type";

export interface AddClientButtonProps {
    workStatuses: readonly IStatusOption[];
    physicalStatuses: readonly IStatusOption[];

    onAdd: (
        client: Omit<IClient, "_id" | "createdAt" | "updatedAt">
    ) => void;

    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;

    form: ClientFormState;
    actions: ClientFormActions;
}