export interface ClientFormProps {
    initialData?: {
        name: string;
        workStatus: string;
        physicalStatus: string;
        comment: string;
        additionalData: { key: string; value: string }[];
    };
    workStatuses: readonly { value: string; label: string }[];
    physicalStatuses: readonly { value: string; label: string }[];
    onSubmit: (client: any) => void;
    onCancel: () => void;
}