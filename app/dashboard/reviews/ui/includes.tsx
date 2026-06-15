import ReviewsColumn from "./ReviewsColumn"
import styles from "../index.module.scss";
import { IReview } from "../page";

interface IProps {
    newReviews: IReview[];
    handleApprove: (id: string) => void;
    handleDelete: (id: string) => void;
    approvedReviews: IReview[];
}

const ReviewsSectionUiIncludes = ({ newReviews, handleApprove, handleDelete, approvedReviews }: IProps) => {
    return (
        <section id="reviews">
            <div className={styles["root-reviews"]}>
                <ReviewsColumn
                    title="Новые отзывы"
                    reviews={newReviews}
                    type="new"
                    onApprove={handleApprove}
                    onDelete={handleDelete}
                />
                <ReviewsColumn
                    title="Отзывы на сайте"
                    reviews={approvedReviews}
                    type="approved"
                    onDelete={handleDelete}
                />
            </div>
        </section>
    )
}

export default ReviewsSectionUiIncludes;