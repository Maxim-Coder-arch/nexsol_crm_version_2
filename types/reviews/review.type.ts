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