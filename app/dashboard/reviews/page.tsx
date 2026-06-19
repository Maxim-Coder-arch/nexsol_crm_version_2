"use client";
import { useEffect, useState } from "react";
import ReviewsSectionUiIncludes from "./ui/includes";
import { IReview } from "@/types/reviews/review.type";



const ReviewsPage = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch("/api/reviews");
            const json = await response.json();
            setReviews(json);
        }

        fetchReviews();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'approved' }),
            });

            if (response.ok) {
                setReviews(prev =>
                    prev.map(review =>
                        review._id === id ? { ...review, status: "approved" } : review
                    )
                );
            }
        } catch (error) {
            console.error('Failed to approve review:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setReviews(prev => prev.filter(review => review._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

    const newReviews = reviews.filter(r => r.status === "new");
    const approvedReviews = reviews.filter(r => r.status === "approved");

    return <ReviewsSectionUiIncludes
        newReviews={newReviews}
        handleApprove={handleApprove}
        handleDelete={handleDelete}
        approvedReviews={approvedReviews}
    />
};

export default ReviewsPage;