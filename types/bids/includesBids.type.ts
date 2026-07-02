import { BidsStatus } from "@/config-and-data/bids.cnf";
import { IBid } from "./bid.type";

export interface IIncludesBidsProps {
    bids: IBid[],
    handleStatusChange: (id: string, newStatus: BidsStatus) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    handleAddBid: (newBid: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }) => Promise<void>;
    columnsData: {
        type: BidsStatus;
        title: string;
    }[];
}