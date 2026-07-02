import { RoleType } from "../team/roleType.type";

export interface IFormDataIncludesUsersProps {
    name: string;
    email: string;
    password: string;
    role: RoleType;
    specialties: string[];
    responsibilities: string[];
}