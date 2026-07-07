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
import { clientType } from "@/types/store-types/client.type";
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";
import styles from "./index.module.scss";

const TeamPage = () => {
    const dispatch = useAppDispatch();
    const { data: users = [], isLoading, error } = useGetUsersQuery(void 0) as clientType<ITeamMember>;
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

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            dispatch(showToast({
                type: 'warning',
                title: 'Заполните поле',
                message: 'Имя обязательно для заполнения',
                duration: 3000,
            }));
            return;
        }

        if (!formData.email.trim()) {
            dispatch(showToast({
                type: 'warning',
                title: 'Заполните поле',
                message: 'Email обязателен для заполнения',
                duration: 3000,
            }));
            return;
        }

        if (!validateEmail(formData.email)) {
            dispatch(showToast({
                type: 'warning',
                title: 'Неверный формат',
                message: 'Пожалуйста, введите корректный email',
                duration: 3000,
            }));
            return;
        }

        if (!formData.password.trim() || formData.password.length < 6) {
            dispatch(showToast({
                type: 'warning',
                title: 'Слабый пароль',
                message: 'Пароль должен содержать минимум 6 символов',
                duration: 3000,
            }));
            return;
        }

        try {
            await createUser({
                ...formData,
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password.trim(),
            }).unwrap();

            dispatch(showToast({
                type: 'success',
                title: 'Пользователь добавлен',
                message: `Пользователь "${formData.name}" успешно создан`,
                duration: 3000,
            }));

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
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось создать пользователя',
                duration: 4000,
            }));
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
            dispatch(showToast({
                type: 'success',
                title: 'Обновлено!',
                message: 'Данные пользователя обновлены',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось обновить пользователя',
                duration: 4000,
            }));
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Удалено!',
                message: 'Пользователь успешно удалён',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось удалить пользователя',
                duration: 4000,
            }));
        }
    };

    const handleRoleChange = async (id: string, newRole: ITeamMember['role']) => {
        try {
            await updateUser({ id, data: { role: newRole } }).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Роль обновлена',
                message: 'Роль пользователя успешно изменена',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось изменить роль',
                duration: 4000,
            }));
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
        dispatch(showToast({
            type: 'error',
            title: 'Ошибка загрузки',
            message: 'Не удалось загрузить пользователей',
            duration: 4000,
        }));
        return (
            <div className={styles["protected-style"]}>
                <h1>Доступ ограничен</h1>
            </div>
        );
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