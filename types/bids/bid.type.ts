import { BidsStatus } from "@/config-and-data/bids.cnf";

export interface IBid {
    _id: string;
    name: string;
    email: string;
    contact: string;
    message: string;
    source: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface BidsColumnProps {
    title: string;
    type: BidsStatus;
    bids: Array<IBid>;
    onStatusChange: (id: string, newStatus: BidsStatus) => void;
    onDelete: (id: string) => void;
}

export interface ConversionStatsProps {
    bids: Array<{ status: string }>;
}

export interface AddBidFormProps {
    onAddBid: (bid: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }) => void;
}

export interface BidCardProps {
    bid: IBid;
    onStatusChange: (newStatus: BidsStatus) => void;
    onDelete: () => void;
}