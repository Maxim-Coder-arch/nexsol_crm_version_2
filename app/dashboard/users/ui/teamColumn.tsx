'use client';
import { ITeamMember, ROLE_LABELS } from '@/types/team';
import TeamCard from './teamCard';
import styles from '../index.module.scss';

interface TeamColumnProps {
    role: ITeamMember['role'];
    users: ITeamMember[];
    onEdit: (user: ITeamMember) => void;
    onDelete: (id: string) => void;
    onRoleChange: (id: string, role: ITeamMember['role']) => void;
}

const TeamColumn = ({ role, users, onEdit, onDelete, onRoleChange }: TeamColumnProps) => {
    const filteredUsers = users.filter(u => u.role === role);

    return (
        <div className={styles["team-column"]}>
            <div className={styles["team-column__header"]}>
                <h2>{ROLE_LABELS[role]}</h2>
                <span>{filteredUsers.length}</span>
            </div>
            <div className={styles["team-column__list"]}>
                {filteredUsers.length === 0 ? (
                    <div className={styles["team-column__empty"]}>Нет пользователей</div>
                ) : (
                    filteredUsers.map(user => (
                        <TeamCard
                            key={user._id}
                            user={user}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onRoleChange={onRoleChange}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TeamColumn;