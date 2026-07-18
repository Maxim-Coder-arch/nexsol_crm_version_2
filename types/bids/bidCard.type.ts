import { BidsStatus } from "@/configs/bids/bids.cnf";
import { IBid } from "./bid.type";

export interface BidCardProps {
    bid: IBid;
    onStatusChange: (newStatus: BidsStatus) => void;
    onDelete: () => void;
}