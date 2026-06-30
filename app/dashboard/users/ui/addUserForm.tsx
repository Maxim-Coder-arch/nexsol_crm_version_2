'use client';
import { RoleType, ROLE_LABELS } from '@/types/team';
import styles from '../index.module.scss';

interface AddUserFormProps {
    formData: {
        name: string;
        email: string;
        password: string;
        role: RoleType;
        specialties: string[];
        responsibilities: string[];
    };
    specialtyInput: string;
    responsibilityInput: string;
    onFormChange: (data: Partial<AddUserFormProps['formData']>) => void;
    onSpecialtyInputChange: (value: string) => void;
    onResponsibilityInputChange: (value: string) => void;
    onAddSpecialty: () => void;
    onRemoveSpecialty: (index: number) => void;
    onAddResponsibility: () => void;
    onRemoveResponsibility: (index: number) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

const AddUserForm = ({
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
    onSubmit,
    onCancel,
}: AddUserFormProps) => {
    const roleOptions: RoleType[] = ['director', 'moderator', 'viewer'];

    return (
        <div className={styles["add-user-form"]}>
            <form onSubmit={onSubmit} className={styles["add-user-form__form"]}>
                <div className={styles["add-user-form__header"]}>
                    <h3>Добавление пользователя</h3>
                    <button type="button" onClick={onCancel} className={styles["add-user-form__close"]}>
                        ✕
                    </button>
                </div>

                <div className={styles["add-user-form__body"]}>
                    <div className={styles["add-user-form__field"]}>
                        <label>Имя *</label>
                        <input
                            type="text"
                            placeholder="Введите имя"
                            value={formData.name}
                            onChange={(e) => onFormChange({ name: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles["add-user-form__field"]}>
                        <label>Email *</label>
                        <input
                            type="email"
                            placeholder="Введите email"
                            value={formData.email}
                            onChange={(e) => onFormChange({ email: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles["add-user-form__field"]}>
                        <label>Пароль *</label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            value={formData.password}
                            onChange={(e) => onFormChange({ password: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles["add-user-form__field"]}>
                        <label>Роль</label>
                        <select
                            value={formData.role}
                            onChange={(e) => onFormChange({ role: e.target.value as RoleType })}
                        >
                            {roleOptions.map(role => (
                                <option key={role} value={role}>{ROLE_LABELS[role]}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles["add-user-form__field"]}>
                        <label>Специальности</label>
                        <div className={styles["add-user-form__tag-input"]}>
                            <input
                                type="text"
                                placeholder="Введите специальность"
                                value={specialtyInput}
                                onChange={(e) => onSpecialtyInputChange(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAddSpecialty())}
                            />
                            <button type="button" onClick={onAddSpecialty}>+</button>
                        </div>
                        <div className={styles["add-user-form__tags"]}>
                            {formData.specialties.map((spec, idx) => (
                                <span key={idx} className={styles["add-user-form__tag"]}>
                                    {spec}
                                    <button type="button" onClick={() => onRemoveSpecialty(idx)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles["add-user-form__field"]}>
                        <label>Обязанности</label>
                        <div className={styles["add-user-form__tag-input"]}>
                            <input
                                type="text"
                                placeholder="Введите обязанность"
                                value={responsibilityInput}
                                onChange={(e) => onResponsibilityInputChange(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAddResponsibility())}
                            />
                            <button type="button" onClick={onAddResponsibility}>+</button>
                        </div>
                        <ul className={styles["add-user-form__list"]}>
                            {formData.responsibilities.map((resp, idx) => (
                                <li key={idx}>
                                    {resp}
                                    <button type="button" onClick={() => onRemoveResponsibility(idx)}>✕</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles["add-user-form__footer"]}>
                    <button type="submit" className={styles["add-user-form__submit"]}>
                        Добавить
                    </button>
                    <button type="button" className={styles["add-user-form__cancel"]} onClick={onCancel}>
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;