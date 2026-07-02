'use client';
import { useState, useEffect } from 'react';
import { ITeamMember } from '@/types/team/teamMember.type';
import styles from "./index.module.scss";
import { EditUserModalProps } from '@/types/modals/users/editUserModal.type';
import { ROLE_LABELS } from '@/types/team/roleLabels.type';

const EditUserModal = ({ isOpen, user, onClose, onSave }: EditUserModalProps) => {
    const [formData, setFormData] = useState<Partial<ITeamMember>>({});
    const [specialtyInput, setSpecialtyInput] = useState('');
    const [responsibilityInput, setResponsibilityInput] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                specialties: [...user.specialties],
                responsibilities: user.responsibilities ? [...user.responsibilities] : [],
            });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(user._id, formData);
        onClose();
    };

    const addSpecialty = () => {
        if (specialtyInput.trim()) {
            setFormData(prev => ({
                ...prev,
                specialties: [...(prev.specialties || []), specialtyInput.trim()]
            }));
            setSpecialtyInput('');
        }
    };

    const removeSpecialty = (index: number) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties?.filter((_, i) => i !== index) || []
        }));
    };

    const addResponsibility = () => {
        if (responsibilityInput.trim()) {
            setFormData(prev => ({
                ...prev,
                responsibilities: [...(prev.responsibilities || []), responsibilityInput.trim()]
            }));
            setResponsibilityInput('');
        }
    };

    const removeResponsibility = (index: number) => {
        setFormData(prev => ({
            ...prev,
            responsibilities: prev.responsibilities?.filter((_, i) => i !== index) || []
        }));
    };

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["modal__header"]}>
                    <h2>Редактирование пользователя</h2>
                    <button className={styles["modal__close"]} onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className={styles["modal__form"]}>
                    <div className={styles["modal__field"]}>
                        <label>Имя *</label>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles["modal__field"]}>
                        <label>Email *</label>
                        <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles["modal__field"]}>
                        <label>Роль</label>
                        <select
                            value={formData.role || 'viewer'}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as ITeamMember['role'] })}
                        >
                            <option value="director">{ROLE_LABELS.director}</option>
                            <option value="moderator">{ROLE_LABELS.moderator}</option>
                            <option value="viewer">{ROLE_LABELS.viewer}</option>
                        </select>
                    </div>

                    <div className={styles["modal__field"]}>
                        <label>Специальности</label>
                        <div className={styles["modal__tag-input"]}>
                            <input
                                type="text"
                                value={specialtyInput}
                                onChange={(e) => setSpecialtyInput(e.target.value)}
                                placeholder="Введите специальность"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                            />
                            <button type="button" onClick={addSpecialty}>+</button>
                        </div>
                        <div className={styles["modal__tags"]}>
                            {formData.specialties?.map((spec, idx) => (
                                <span key={idx} className={styles["modal__tag"]}>
                                    {spec}
                                    <button type="button" onClick={() => removeSpecialty(idx)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles["modal__field"]}>
                        <label>Обязанности</label>
                        <div className={styles["modal__tag-input"]}>
                            <input
                                type="text"
                                value={responsibilityInput}
                                onChange={(e) => setResponsibilityInput(e.target.value)}
                                placeholder="Введите обязанность"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                            />
                            <button type="button" onClick={addResponsibility}>+</button>
                        </div>
                        <ul className={styles["modal__list"]}>
                            {formData.responsibilities?.map((resp, idx) => (
                                <li key={idx}>
                                    {resp}
                                    <button type="button" onClick={() => removeResponsibility(idx)}>✕</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles["modal__actions"]}>
                        <button type="submit" className={styles["modal__save"]}>Сохранить</button>
                        <button type="button" className={styles["modal__cancel"]} onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;