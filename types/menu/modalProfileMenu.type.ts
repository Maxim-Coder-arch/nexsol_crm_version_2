import { User } from "../hooks/useUser.type";

export interface IProfileModalMenu {
    openModalUser: boolean;
    user: User;
    handleCloseMenu: () => void;
    handleOpenProfile: () => void;
}