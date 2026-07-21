import { BidsStatus } from "@/configs/bids/bids.cnf";
import { IBid } from "./bid.type";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface IIncludesBidsProps {
    bids: IBid[],
    handleStatusChange: (id: string, newStatus: BidsStatus) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    columnsData: {
        type: BidsStatus;
        title: string;
    }[];
    handleSubmit: (e: FormEvent<Element>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
        formData: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    };
}