import { IReview } from "./review.type";

export interface ReviewsColumnProps {
    title: string;
    reviews: IReview[];
    type: "new" | "approved";
    onApprove?: (id: string) => void;
    onDelete: (id: string) => void;
}
