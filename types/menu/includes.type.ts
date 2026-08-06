import { Dispatch, SetStateAction } from "react";
import { User } from "../hooks/useUser.type";

export interface IIncludesMenu {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
    handleCloseMenu: () => void;
    pathname: string;
    user: User;
    handleOpenModalUser: () => void;
    openModalUser: boolean;
    handleOpenProfile: () => void;
}