import { ITeamMember } from "../team/teamMember.type";
import { IFormDataIncludesUsersProps } from "./formDataIncludesUsers.type";

export interface IncludesUsersProps {
    users: ITeamMember[];
    editingUser: ITeamMember | null;
    isModalOpen: boolean;
    showAddForm: boolean;
    formData: IFormDataIncludesUsersProps;
    specialtyInput: string;
    responsibilityInput: string;
    onFormChange: (data: Partial<IFormDataIncludesUsersProps>) => void;
    onSpecialtyInputChange: (value: string) => void;
    onResponsibilityInputChange: (value: string) => void;
    onAddSpecialty: () => void;
    onRemoveSpecialty: (index: number) => void;
    onAddResponsibility: () => void;
    onRemoveResponsibility: (index: number) => void;
    onAddSubmit: (e: React.FormEvent) => void;
    onEdit: (user: ITeamMember) => void;
    onSaveEdit: (id: string, data: Partial<ITeamMember>) => void;
    onDelete: (id: string) => void;
    onRoleChange: (id: string, role: ITeamMember['role']) => void;
    onAddUser: () => void;
    onCloseModal: () => void;
    onCancelAdd: () => void;
}