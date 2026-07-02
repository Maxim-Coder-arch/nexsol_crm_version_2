"use client";
import { useEffect, useState } from "react";
import { ITeamMember } from "@/types/team/teamMember.type";
import IncludesUsers from "./ui/includes";
import { RoleType } from "@/types/team/roleType.type";

const TeamPage = () => {
    const [users, setUsers] = useState<ITeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<ITeamMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'viewer' as RoleType,
        specialties: [] as string[],
        responsibilities: [] as string[],
    });
    const [specialtyInput, setSpecialtyInput] = useState('');
    const [responsibilityInput, setResponsibilityInput] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const json = await response.json();
            setUsers(json);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFormChange = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleAddSpecialty = () => {
        if (specialtyInput.trim()) {
            setFormData(prev => ({
                ...prev,
                specialties: [...prev.specialties, specialtyInput.trim()]
            }));
            setSpecialtyInput('');
        }
    };

    const handleRemoveSpecialty = (index: number) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.filter((_, i) => i !== index)
        }));
    };

    const handleAddResponsibility = () => {
        if (responsibilityInput.trim()) {
            setFormData(prev => ({
                ...prev,
                responsibilities: [...prev.responsibilities, responsibilityInput.trim()]
            }));
            setResponsibilityInput('');
        }
    };

    const handleRemoveResponsibility = (index: number) => {
        setFormData(prev => ({
            ...prev,
            responsibilities: prev.responsibilities.filter((_, i) => i !== index)
        }));
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            alert('Заполните все обязательные поля');
            return;
        }

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    specialties: formData.specialties,
                    responsibilities: formData.responsibilities
                })
            });

            const data = await response.json();

            if (response.ok) {
                setUsers(prev => [data, ...prev]);
                setShowAddForm(false);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'viewer',
                    specialties: [],
                    responsibilities: [],
                });
                setSpecialtyInput('');
                setResponsibilityInput('');
            } else {
                alert(data.error || 'Ошибка при создании пользователя');
            }
        } catch (error) {
            console.error('Failed to add user:', error);
            alert('Ошибка при создании пользователя');
        }
    };

    const handleEdit = (user: ITeamMember) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async (id: string, data: Partial<ITeamMember>) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                setUsers(prev => prev.map(user =>
                    user._id === id ? { ...user, ...result } : user
                ));
                setIsModalOpen(false);
                setEditingUser(null);
            } else {
                alert(result.error || 'Ошибка при обновлении пользователя');
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Ошибка при обновлении пользователя');
        }
    };

    const handleDelete = async (id: string) => {

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setUsers(prev => prev.filter(user => user._id !== id));
            } else {
                const data = await response.json();
                alert(data.error || 'Ошибка при удалении пользователя');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Ошибка при удалении пользователя');
        }
    };

    const handleRoleChange = async (id: string, newRole: ITeamMember['role']) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                setUsers(prev => prev.map(user =>
                    user._id === id ? { ...user, role: newRole, updatedAt: new Date() } : user
                ));
            }
        } catch (error) {
            console.error('Failed to change role:', error);
        }
    };

    const handleAddUser = () => {
        setShowAddForm(true);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'viewer',
            specialties: [],
            responsibilities: [],
        });
        setSpecialtyInput('');
        setResponsibilityInput('');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    if (loading) {
        return <div>Загрузка пользователей...</div>;
    }

    return (
        <IncludesUsers
            users={users}
            editingUser={editingUser}
            isModalOpen={isModalOpen}
            showAddForm={showAddForm}
            formData={formData}
            specialtyInput={specialtyInput}
            responsibilityInput={responsibilityInput}
            onFormChange={handleFormChange}
            onSpecialtyInputChange={setSpecialtyInput}
            onResponsibilityInputChange={setResponsibilityInput}
            onAddSpecialty={handleAddSpecialty}
            onRemoveSpecialty={handleRemoveSpecialty}
            onAddResponsibility={handleAddResponsibility}
            onRemoveResponsibility={handleRemoveResponsibility}
            onAddSubmit={handleAddSubmit}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
            onAddUser={handleAddUser}
            onCloseModal={handleCloseModal}
            onCancelAdd={handleCancelAdd}
        />
    );
};

export default TeamPage;