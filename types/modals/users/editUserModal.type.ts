import { ITeamMember } from "@/types/team/teamMember.type";

export interface EditUserModalProps {
    isOpen: boolean;
    user: ITeamMember | null;
    onClose: () => void;
    onSave: (id: string, data: Partial<ITeamMember>) => void;
}