export interface ITeamMember {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'director' | 'moderator' | 'viewer';
    specialties: string[];
    responsibilities?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type RoleType = 'director' | 'moderator' | 'viewer';

export const ROLE_LABELS: Record<RoleType, string> = {
    director: 'Администратор',
    moderator: 'Модератор',
    viewer: 'Аналитик'
};

export const ROLE_COLORS: Record<RoleType, string> = {
    director: '#c12060',
    moderator: '#fff083',
    viewer: '#486284'
};