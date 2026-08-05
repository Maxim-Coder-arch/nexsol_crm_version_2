'use client';

import AddUserButton from './addUserButton';
import TeamColumn from './teamColumn';
import EditUserModal from '@/app/components/modals/users/editUserModal';
import AddUserForm from './addUserForm';
import { IncludesUsersProps } from '@/types/users/includesUser.type';
import { rolesUsers } from '@/configs/users/users.cnf';
import styles from '../index.module.scss';

const IncludesUsers = ({
    users,
    editingUser,
    isModalOpen,
    showAddForm,
    formData,
    specialtyInput,
    responsibilityInput,
    onFormChange,
    onSpecialtyInputChange,
    onResponsibilityInputChange,
    onAddSpecialty,
    onRemoveSpecialty,
    onAddResponsibility,
    onRemoveResponsibility,
    onAddSubmit,
    onEdit,
    onSaveEdit,
    onDelete,
    onRoleChange,
    onAddUser,
    onCloseModal,
    onCancelAdd,
}: IncludesUsersProps) => {

    return (
        <section id="team">
            <div className={styles["team"]}>
                {!showAddForm ? (
                    <AddUserButton onClick={onAddUser} />
                ) : (
                    <AddUserForm
                        formData={formData}
                        specialtyInput={specialtyInput}
                        responsibilityInput={responsibilityInput}
                        onFormChange={onFormChange}
                        onSpecialtyInputChange={onSpecialtyInputChange}
                        onResponsibilityInputChange={onResponsibilityInputChange}
                        onAddSpecialty={onAddSpecialty}
                        onRemoveSpecialty={onRemoveSpecialty}
                        onAddResponsibility={onAddResponsibility}
                        onRemoveResponsibility={onRemoveResponsibility}
                        onSubmit={onAddSubmit}
                        onCancel={onCancelAdd}
                    />
                )}

                <div className={styles["team__grid"]}>
                    {rolesUsers.map(role => (
                        <TeamColumn
                            key={role}
                            role={role}
                            users={users}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onRoleChange={onRoleChange}
                        />
                    ))}
                </div>

                <EditUserModal
                    isOpen={isModalOpen}
                    user={editingUser}
                    onClose={onCloseModal}
                    onSave={onSaveEdit}
                />
            </div>
        </section>
    );
};

export default IncludesUsers;