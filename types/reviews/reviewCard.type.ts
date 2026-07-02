import { IReview } from "./review.type";

export interface ReviewCardProps {
    review: IReview;
    type: "new" | "approved";
    onApprove?: (id: string) => void;
    onDelete: (id: string) => void;
}