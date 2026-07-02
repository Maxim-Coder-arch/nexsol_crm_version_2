import styles from "../index.module.scss";
import { ReviewCardProps } from "@/types/reviews/reviewCard.type";

const ReviewCard = ({ 
    review, 
    type, 
    onApprove, 
    onDelete
 }: ReviewCardProps) => {
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    return (
        <div className={styles["root-reviews__column__data__review"]}>
            <div className={styles["root-reviews__column__data__review__header"]}>
                <div>
                    <h3>{review.name}</h3>
                    <h4>{review.role}</h4>
                </div>
                <div className={styles["rating"]}>{stars}</div>
            </div>

            <div className={styles["root-reviews__column__data__review__text"]}>
                <p>{review.text}</p>
            </div>

            <div className={styles["root-reviews__column__data__review__footer"]}>
                <div className={styles["root-reviews__column__data__review__footer__buttons"]}>
                    {type === "new" && onApprove && (
                        <button onClick={() => onApprove(review._id)}>Добавить на сайт</button>
                    )}
                    <button onClick={() => onDelete(review._id)}>Удалить</button>
                </div>
                <div className={styles["root-reviews__column__data__review__footer__meta"]}>
                    <p>Добавлено: {review.createdAt}</p>
                    <p>Изменено: {review.updatedAt}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;