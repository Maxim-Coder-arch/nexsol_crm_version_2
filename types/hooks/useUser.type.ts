export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    specialties?: string[];
    responsibilities?: string[];
    createdAt: string;
}