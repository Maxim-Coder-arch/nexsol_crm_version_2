import { User } from "../hooks/useUser.type";

export interface IModalUserButton {
    user: User;
    handleOpenModalUser: () => void;
}