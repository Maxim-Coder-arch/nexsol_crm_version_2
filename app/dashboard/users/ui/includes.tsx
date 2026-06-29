'use client';
import { ITeamMember } from '@/types/team';
import AddUserButton from './addUserButton';
import TeamColumn from './teamColumn';
import EditUserModal from '@/app/components/modals/users/editUserModal';
import styles from '../index.module.scss';

interface IncludesUsersProps {
    users: ITeamMember[];
    editingUser: ITeamMember | null;
    isModalOpen: boolean;
    onEdit: (user: ITeamMember) => void;
    onSaveEdit: (id: string, data: Partial<ITeamMember>) => void;
    onDelete: (id: string) => void;
    onRoleChange: (id: string, role: ITeamMember['role']) => void;
    onAddUser: () => void;
    onCloseModal: () => void;
}

const IncludesUsers = ({
    users,
    editingUser,
    isModalOpen,
    onEdit,
    onSaveEdit,
    onDelete,
    onRoleChange,
    onAddUser,
    onCloseModal,
}: IncludesUsersProps) => {
    const roles: ITeamMember['role'][] = ['director', 'moderator', 'viewer'];

    return (
        <section id="team">
            <div className={styles["team"]}>
                <AddUserButton onClick={onAddUser} />

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