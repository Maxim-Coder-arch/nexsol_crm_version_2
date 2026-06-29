"use client";
import { useState } from "react";
import { ITeamMember } from "@/types/team";
import IncludesUsers from "./ui/includes";

const mockUsers: ITeamMember[] = [
    {
        _id: "1",
        name: "Алексей",
        email: "alex@nexsol.ru",
        password: "123",
        role: "director",
        specialties: ["Fullstack", "DevOps", "Архитектура"],
        responsibilities: ["Управление командой", "Технический контроль"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: "2",
        name: "Мария",
        email: "maria@nexsol.ru",
        password: "123",
        role: "moderator",
        specialties: ["UI/UX", "Frontend"],
        responsibilities: ["Модерация", "Дизайн"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: "3",
        name: "Иван",
        email: "ivan@nexsol.ru",
        password: "123",
        role: "viewer",
        specialties: ["Аналитика", "Маркетинг"],
        responsibilities: ["Сбор данных", "Отчеты"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
];

const TeamPage = () => {
    const [users, setUsers] = useState<ITeamMember[]>(mockUsers);
    const [editingUser, setEditingUser] = useState<ITeamMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (user: ITeamMember) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSaveEdit = (id: string, data: Partial<ITeamMember>) => {
        setUsers(prev => prev.map(user =>
            user._id === id ? { ...user, ...data, updatedAt: new Date() } : user
        ));
    };

    const handleDelete = (id: string) => {
        setUsers(prev => prev.filter(user => user._id !== id));
    };

    const handleRoleChange = (id: string, newRole: ITeamMember['role']) => {
        setUsers(prev => prev.map(user =>
            user._id === id ? { ...user, role: newRole, updatedAt: new Date() } : user
        ));
    };

    const handleAddUser = () => {
        
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    return (
        <IncludesUsers
            users={users}
            editingUser={editingUser}
            isModalOpen={isModalOpen}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
            onAddUser={handleAddUser}
            onCloseModal={handleCloseModal}
        />
    );
};

export default TeamPage;