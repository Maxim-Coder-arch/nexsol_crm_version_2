'use client';
import styles from '../index.module.scss';

interface AddUserButtonProps {
    onClick: () => void;
}

const AddUserButton = ({ onClick }: AddUserButtonProps) => {
    return (
        <div className={styles["add-user"]}>
            <button className={styles["add-user__btn"]} onClick={onClick}>
                + Добавить пользователя
            </button>
        </div>
    );
};

export default AddUserButton;