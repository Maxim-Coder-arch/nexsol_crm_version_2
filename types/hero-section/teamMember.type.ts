export interface TeamMember {
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