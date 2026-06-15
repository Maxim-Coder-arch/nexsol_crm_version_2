import styles from "../index.module.scss";

interface EmptyStateProps {
    type: "new" | "approved";
}

const EmptyState = ({ type }: EmptyStateProps) => {
    const message = type === "new" ? "Нет новых отзывов" : "Нет отзывов на сайте";
    
    return (
        <div className={styles["empty-state"]}>
            <p>{message}</p>
        </div>
    );
};

export default EmptyState;