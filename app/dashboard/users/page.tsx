"use client";
import { useState } from "react";
import { ITeamMember } from "@/types/team/teamMember.type";
import IncludesUsers from "./ui/includes";
import { RoleType } from "@/types/team/roleType.type";
import TemplateContent from "@/app/components/share/template";
import { 
    useCreateUserMutation, 
    useDeleteUserMutation, 
    useGetUsersQuery, 
    useUpdateUserMutation 
} from "@/store/client-api";
import { TeamMember } from "@/types/hero-section/teamMember.type";
import { clientType } from "@/types/store-types/client.type";

const TeamPage = () => {
    const { data: users = [], isLoading, error } = useGetUsersQuery(void 0) as clientType<TeamMember>;
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
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
            await createUser(formData).unwrap();
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
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    const handleEdit = (user: ITeamMember) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async (id: string, data: Partial<ITeamMember>) => {
        try {
            await updateUser({ id, data }).unwrap();
            setIsModalOpen(false);
            setEditingUser(null);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id).unwrap();
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleRoleChange = async (id: string, newRole: ITeamMember['role']) => {
        try {
            await updateUser({ id, data: { role: newRole } }).unwrap();
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

    if (isLoading) {
        return <div>Загрузка пользователей...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки</div>;
    }

    return (
        <TemplateContent>
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
        </TemplateContent>
    );
};

export default TeamPage;