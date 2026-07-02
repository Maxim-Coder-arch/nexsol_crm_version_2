export interface AddServiceProps {
    setFormData: React.Dispatch<React.SetStateAction<{
        title: string;
        description: string;
        url: string;
    }>>;
    handleAdd: () => void;
    formData: {
        title: string;
        description: string;
        url: string;
    };
}