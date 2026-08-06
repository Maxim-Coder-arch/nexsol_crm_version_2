import { SetStateAction } from "react";

export interface IBurger {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (value: SetStateAction<boolean>) => void
}