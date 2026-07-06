"use client";
import ReviewsSectionUiIncludes from "./ui/includes";
import TemplateContent from "@/app/components/share/template";
import { useDeleteReviewMutation, useGetReviewsQuery, useUpdateReviewMutation } from "@/store/client-api";
import { IReview } from "@/types/reviews/review.type";
import { clientType } from "@/types/store-types/client.type";

const ReviewsPage = () => {
    const { data: reviews = [], isLoading, error} = useGetReviewsQuery(void 0) as clientType<IReview>;
    const [updateReview] = useUpdateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();

    const handleApprove = async (id: string) => {
        try {
            await updateReview({ id, data: { status: "approved" } }).unwrap();
        } catch (error) {
            console.error('Failed to approve review:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteReview(id).unwrap();
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

    const newReviews = reviews.filter(r => r.status === "new");
    const approvedReviews = reviews.filter(r => r.status === "approved");

    return (
        <TemplateContent>
            <ReviewsSectionUiIncludes
                newReviews={newReviews}
                handleApprove={handleApprove}
                handleDelete={handleDelete}
                approvedReviews={approvedReviews}
            />
        </TemplateContent>
    )
};

export default ReviewsPage;