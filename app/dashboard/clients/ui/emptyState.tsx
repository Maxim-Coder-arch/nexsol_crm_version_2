import styles from "../index.module.scss";

const EmptyState = () => {
    return (
        <div className={styles["empty-state"]}>
            <p>Нет клиентов</p>
        </div>
    );
};

export default EmptyState;