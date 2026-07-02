import { IService } from "./service.type";

export interface IListOfServicesProps {
    services: IService[], handleDelete: (id: string) => void
}