import { Dispatch, FormEvent, SetStateAction } from "react";
import { FunnelType } from "./ItemType.type";

export interface IAddFunnel { 
    funnelTypes: { value: FunnelType; label: string }[];
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    type: FunnelType;
    setType: Dispatch<SetStateAction<FunnelType>>;
    handleSubmit: (e: FormEvent<Element>) => void;
}