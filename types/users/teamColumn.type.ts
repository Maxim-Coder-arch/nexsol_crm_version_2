import { ITeamMember } from "../team/teamMember.type";

export interface TeamColumnProps {
    role: ITeamMember['role'];
    users: ITeamMember[];
    onEdit: (user: ITeamMember) => void;
    onDelete: (id: string) => void;
    onRoleChange: (id: string, role: ITeamMember['role']) => void;
}