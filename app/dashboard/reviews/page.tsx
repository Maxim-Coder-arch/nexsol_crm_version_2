"use client";
import ReviewsSectionUiIncludes from "./ui/includes";
import TemplateContent from "@/app/components/share/template";
import { useDeleteReviewMutation, useGetReviewsQuery, useUpdateReviewMutation } from "@/store/client-api";
import { IReview } from "@/types/reviews/review.type";
import { clientType } from "@/types/store-types/client.type";
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";

const ReviewsPage = () => {
    const dispatch = useAppDispatch();
    const { data: reviews = [], isLoading, error } = useGetReviewsQuery(void 0) as clientType<IReview>;
    const [updateReview] = useUpdateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();

    const handleApprove = async (id: string) => {
        try {
            await updateReview({ id, data: { status: "approved" } }).unwrap();
            
            const review = reviews.find(r => r._id === id);
            dispatch(showToast({
                type: 'success',
                title: 'Отзыв одобрен!',
                message: `Отзыв от ${review?.name || 'пользователя'} опубликован на сайте`,
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось одобрить отзыв',
                duration: 4000,
            }));
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Удалить отзыв?')) return;
        
        try {
            await deleteReview(id).unwrap();
            
            dispatch(showToast({
                type: 'success',
                title: 'Удалено!',
                message: 'Отзыв успешно удалён',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось удалить отзыв',
                duration: 4000,
            }));
        }
    };

    if (isLoading) return <div>Загрузка...</div>;

    if (error) {
        dispatch(showToast({
            type: 'error',
            title: 'Ошибка загрузки',
            message: 'Не удалось загрузить отзывы',
            duration: 4000,
        }));
        return <div>Ошибка загрузки</div>;
    }

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