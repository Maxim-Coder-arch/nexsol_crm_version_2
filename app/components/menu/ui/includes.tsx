import Burger from "./burger";
import MenuList from "./list";
import ModalUserButton from "./modalUserButton";
import ProfileModalMenu from "./profileModal";
import { IIncludesMenu } from "@/types/menu/includes.type";
import styles from "../index.module.scss";

const IncludesMenu = ({ 
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleCloseMenu,
    pathname,
    user,
    handleOpenModalUser,
    openModalUser,
    handleOpenProfile,
 }: IIncludesMenu) => {
    return (
        <nav className={styles["parent-root-menu"]}>
            <div className={styles["parent-root-menu__child"]}>
                <div className={styles["parent-root-menu__child__logo"]}>
                    <span>Nexsol Crm</span>
                </div>
                
                <Burger isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

                <MenuList isMobileMenuOpen={isMobileMenuOpen} pathname={pathname} handleCloseMenu={handleCloseMenu} />

                <div className={styles["parent-root-menu__child__profile-window"]}>
                    <ModalUserButton user={user} handleOpenModalUser={handleOpenModalUser} />

                    <ProfileModalMenu
                        openModalUser={openModalUser}
                        user={user}
                        handleCloseMenu={handleCloseMenu}
                        handleOpenProfile={handleOpenProfile}
                    />


                </div>
            </div>
        </nav>
    )
}

export default IncludesMenu;