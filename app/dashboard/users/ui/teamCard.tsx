'use client';
import { ITeamMember, ROLE_LABELS, ROLE_COLORS } from '../../../../types/team';
import styles from '../index.module.scss';

interface TeamCardProps {
    user: ITeamMember;
    onEdit: (user: ITeamMember) => void;
    onDelete: (id: string) => void;
    onRoleChange: (id: string, role: ITeamMember['role']) => void;
}

const TeamCard = ({ user, onEdit, onDelete, onRoleChange }: TeamCardProps) => {
    const roleOptions: ITeamMember['role'][] = ['director', 'moderator', 'viewer'];

    return (
        <div className={styles["team-card"]}>
            <div className={styles["team-card__avatar"]} style={{ background: ROLE_COLORS[user.role] }}>
                <span>{user.name.charAt(0).toUpperCase()}</span>
            </div>

            <div className={styles["team-card__info"]}>
                <h3>{user.name}</h3>
                <p className={styles["team-card__email"]}>{user.email}</p>
                <p className={styles["team-card__role"]}>
                    Роль: <span>{ROLE_LABELS[user.role]}</span>
                </p>

                {user.specialties && user.specialties.length > 0 && (
                    <div className={styles["team-card__section"]}>
                        <span className={styles["team-card__label"]}>Специальности:</span>
                        <div className={styles["team-card__tags"]}>
                            {user.specialties.map((spec, idx) => (
                                <span key={idx} className={styles["team-card__tag"]}>{spec}</span>
                            ))}
                        </div>
                    </div>
                )}

                {user.responsibilities && user.responsibilities.length > 0 && (
                    <div className={styles["team-card__section"]}>
                        <span className={styles["team-card__label"]}>Обязанности:</span>
                        <ul className={styles["team-card__list"]}>
                            {user.responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={styles["team-card__dates"]}>
                    <span>Создан: {new Date(user.createdAt).toLocaleDateString('ru-RU')}</span>
                    <span>Обновлён: {new Date(user.updatedAt).toLocaleDateString('ru-RU')}</span>
                </div>
            </div>

            <div className={styles["team-card__actions"]}>
                <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user._id, e.target.value as ITeamMember['role'])}
                    className={styles["team-card__role-select"]}
                >
                    {roleOptions.map(role => (
                        <option key={role} value={role}>{ROLE_LABELS[role]}</option>
                    ))}
                </select>
                <button className={styles["team-card__edit"]} onClick={() => onEdit(user)}>✎</button>
                <button className={styles["team-card__delete"]} onClick={() => onDelete(user._id)}>✕</button>
            </div>
        </div>
    );
};

export default TeamCard;