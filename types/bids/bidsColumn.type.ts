import { BidsStatus } from "@/config-and-data/bids.cnf";
import { IBid } from "./bid.type";

export interface BidsColumnProps {
    title: string;
    type: BidsStatus;
    bids: Array<IBid>;
    onStatusChange: (id: string, newStatus: BidsStatus) => void;
    onDelete: (id: string) => void;
}