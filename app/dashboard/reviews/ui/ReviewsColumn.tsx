import { IReview } from "../page";
import ReviewCard from "./reviewCard";
import EmptyState from "./emptyState";
import styles from "../index.module.scss";

interface ReviewsColumnProps {
    title: string;
    reviews: IReview[];
    type: "new" | "approved";
    onApprove?: (id: string) => void;
    onDelete: (id: string) => void;
}

const ReviewsColumn = ({ title, reviews, type, onApprove, onDelete }: ReviewsColumnProps) => {
    return (
        <div className={`${styles["root-reviews__column"]} ${styles[`root-reviews__column--${type}`]}`}>
            <div className={styles["root-reviews__column__header"]}>
                <h2>{title}</h2>
                <span>{reviews.length}</span>
            </div>

            <div className={styles["root-reviews__column__data"]}>
                {reviews.length === 0 ? (
                    <EmptyState type={type} />
                ) : (
                    reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            type={type}
                            onApprove={onApprove}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewsColumn;