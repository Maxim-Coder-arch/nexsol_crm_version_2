import { IService } from "./service.type";

export interface IncludesServicesProps {
    services: IService[];
    handleDelete: (id: string) => void;
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