'use client';
import { AddUserButtonProps } from '@/types/users/addUserButton.type';
import styles from '../index.module.scss';

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