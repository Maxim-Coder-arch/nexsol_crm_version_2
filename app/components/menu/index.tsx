'use client';

import { usePathname } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import { useState, useEffect } from "react";
import { openModal } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";
import IncludesMenu from "./ui/includes";

const Menu = () => {
    const [openModalUser, setOpenModalUser] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();
    const dispatch = useAppDispatch();

    const handleOpenProfile = () => {
        setOpenModalUser(false);
        dispatch(openModal({ type: 'profile' }));
    };

    const handleCloseMenu = () => {
        setOpenModalUser(false);
        setIsMobileMenuOpen(false);
    };

    const handleOpenModalUser = () => setOpenModalUser(prev => !prev);


    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return user && <IncludesMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleCloseMenu={handleCloseMenu}
        pathname={pathname}
        user={user}
        handleOpenModalUser={handleOpenModalUser}
        openModalUser={openModalUser}
        handleOpenProfile={handleOpenProfile}
    />
}

export default Menu;