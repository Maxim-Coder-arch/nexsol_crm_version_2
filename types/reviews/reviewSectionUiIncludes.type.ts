import { IReview } from "./review.type";

export interface ReviewSectioUiIncludesProps {
    newReviews: IReview[];
    handleApprove: (id: string) => void;
    handleDelete: (id: string) => void;
    approvedReviews: IReview[];
}