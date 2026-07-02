import { RoleType } from "../team/roleType.type";

export interface AddUserFormProps {
    formData: {
        name: string;
        email: string;
        password: string;
        role: RoleType;
        specialties: string[];
        responsibilities: string[];
    };
    specialtyInput: string;
    responsibilityInput: string;
    onFormChange: (data: Partial<AddUserFormProps['formData']>) => void;
    onSpecialtyInputChange: (value: string) => void;
    onResponsibilityInputChange: (value: string) => void;
    onAddSpecialty: () => void;
    onRemoveSpecialty: (index: number) => void;
    onAddResponsibility: () => void;
    onRemoveResponsibility: (index: number) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}