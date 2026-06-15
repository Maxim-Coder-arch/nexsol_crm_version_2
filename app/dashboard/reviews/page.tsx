"use client";
import { useState } from "react";
import ReviewsSectionUiIncludes from "./ui/includes";

export interface IReview {
    _id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
    status: "new" | "approved";
    createdAt: string;
    updatedAt: string;
}

const initialReviewsData: IReview[] = [
    {
        _id: "7hhcnrt&122dfef-$frt",
        name: "Irina",
        role: "Директор консалтинг студии",
        text: "Сделали все максимально быстро и качественно. Теперь буду сотрудничать с nexsol в долгую",
        rating: 5,
        status: "new",
        createdAt: "22.06.2025, 9:30",
        updatedAt: "22.06.2025, 9:30",
    },
    {
        _id: "7hhcnrt&122dgfgbef-$frt",
        name: "Irina",
        role: "Директор консалтинг студии",
        text: "Сделали все максимально быстро и качественно. Теперь буду сотрудничать с nexsol в долгую. Ребята реально круто делают! Сделали интернет магазин - все быстро и качественно. Ребята реально круто делают! Сделали интернет магазин - все быстро и качественно. Ребята реально круто делают! Сделали интернет магазин - все быстро и качественно. Ребята реально круто делают! Сделали интернет магазин - все быстро и качественно. Ребята реально круто делают! Сделали интернет магазин - все быстро и качественно.",
        rating: 5,
        status: "new",
        createdAt: "22.06.2025, 9:30",
        updatedAt: "22.06.2025, 9:30",
    },
    {
        _id: "fbbhjm2#fr",
        name: "Alexander",
        role: "Основатель хлебопекарни",
        text: "Ребята реально круто делают! Сделали интернет магазин - все быстро и качественно.",
        rating: 5,
        status: "approved",
        createdAt: "22.06.2025, 9:30",
        updatedAt: "22.06.2025, 9:30",
    },
    {
        _id: "fbbhjmrfh5yjy2#fr",
        name: "Alexander",
        role: "Основатель хлебопекарни",
        text: "Ребята реально круто делают! Сделали интернет магазин - все быстро и качественно.",
        rating: 5,
        status: "approved",
        createdAt: "22.06.2025, 9:30",
        updatedAt: "22.06.2025, 9:30",
    },
];

const ReviewsPage = () => {
    const [reviews, setReviews] = useState<IReview[]>(initialReviewsData);

    const handleApprove = (id: string) => {
        setReviews(prev =>
            prev.map(review =>
                review._id === id ? { ...review, status: "approved", updatedAt: new Date().toLocaleString() } : review
            )
        );
    };

    const handleDelete = (id: string) => {
        setReviews(prev => prev.filter(review => review._id !== id));
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