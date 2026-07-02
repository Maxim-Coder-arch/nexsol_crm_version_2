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





