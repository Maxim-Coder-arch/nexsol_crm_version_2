import ReviewsColumn from "./ReviewsColumn"
import styles from "../index.module.scss";
import { ReviewSectioUiIncludesProps } from "@/types/reviews/reviewSectionUiIncludes.type";

const ReviewsSectionUiIncludes = ({ 
    newReviews, 
    handleApprove, 
    handleDelete, 
    approvedReviews
 }: ReviewSectioUiIncludesProps) => {
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