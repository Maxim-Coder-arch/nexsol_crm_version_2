'use client';
import { ProfileContext } from '@/app/context/modalContext';
import { useUser } from '@/app/hooks/useUser';
import { useContext } from 'react';
import styles from "./index.module.scss";
import CloseIcon from '@/public/global/close';

const ProfileModal = () => {
    const context = useContext(ProfileContext);
    const { user } = useUser();

    if (!context) return null;

    const { isOpen, close } = context;

    if (!isOpen) return null;

    return (
        <div className={styles["darkening-modal"]} onClick={close}>
            <div className={styles["darkening-modal__window"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["darkening-modal__window__header"]}>
                    <h2>{user?.name}</h2>
                    <button onClick={close}>
                        <CloseIcon />
                    </button>
                </div>

                <div className={styles["darkening-modal__window__body"]}>
                    <div className={styles["info-row"]}>
                        <span className={styles["label"]}>Email:</span>
                        <span className={styles["value"]}>{user?.email}</span>
                    </div>

                    <div className={styles["info-row"]}>
                        <span className={styles["label"]}>Роль:</span>
                        <span className={styles["value"]}>{user?.role}</span>
                    </div>

                    <div className={styles["info-row"]}>
                        <span className={styles["label"]}>Дата регистрации:</span>
                        <span className={styles["value"]}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</span>
                    </div>

                    {user?.specialties && user.specialties.length > 0 && (
                        <div className={styles["specialties"]}>
                            <span className={styles["label"]}>Специальности:</span>
                            <div className={styles["tags"]}>
                                {user.specialties.map((spec, idx) => (
                                    <span key={idx} className={styles["tag"]}>{spec}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {user?.responsibilities && user.responsibilities.length > 0 && (
                        <div className={styles["responsibilities"]}>
                            <span className={styles["label"]}>Обязанности:</span>
                            <ul className={styles["list"]}>
                                {user.responsibilities.map((resp, idx) => (
                                    <li key={idx}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles["darkening-modal__window__footer"]}>
                    <button onClick={close} className={styles["close-btn"]}>
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;