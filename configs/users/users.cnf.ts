import { RoleType } from "@/types/team/roleType.type";
import { ITeamMember } from "@/types/team/teamMember.type";

export const roleOptions: RoleType[] = ['director', 'moderator', 'viewer'];

export const rolesUsers: ITeamMember['role'][] = ['director', 'moderator', 'viewer'];