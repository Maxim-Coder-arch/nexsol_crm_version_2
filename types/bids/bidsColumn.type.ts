import { BidsStatus } from "@/configs/bids/bids.cnf";
import { IBid } from "./bid.type";

export interface BidsColumnProps {
    title: string;
    type: BidsStatus;
    bids: Array<IBid>;
    onStatusChange: (id: string, newStatus: BidsStatus) => void;
    onDelete: (id: string) => void;
}