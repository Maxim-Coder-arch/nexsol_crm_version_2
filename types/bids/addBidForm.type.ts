import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface AddBidFormProps {
    handleSubmit: (e: FormEvent<Element>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
        formData: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }
}