export interface AddFileFormProps {
    onAdd: (file: File, isShared: boolean) => void;
    onCancel: () => void;
}