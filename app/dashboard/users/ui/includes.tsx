'use client';
import { ITeamMember } from '@/types/team/teamMember.type';
import AddUserButton from './addUserButton';
import TeamColumn from './teamColumn';
import EditUserModal from '@/app/components/modals/users/editUserModal';
import AddUserForm from './addUserForm';
import styles from '../index.module.scss';
import { IncludesUsersProps } from '@/types/users/includesUser.type';

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

    const roles: ITeamMember['role'][] = ['director', 'moderator', 'viewer'];

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
                    {roles.map(role => (
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