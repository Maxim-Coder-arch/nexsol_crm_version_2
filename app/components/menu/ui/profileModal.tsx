import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { IProfileModalMenu } from "@/types/menu/modalProfileMenu.type";
import styles from "../index.module.scss";

const ProfileModalMenu = ({ 
    openModalUser, 
    user, 
    handleCloseMenu, 
    handleOpenProfile
 }: IProfileModalMenu) => {
    return (
        <AnimatePresence>
            {openModalUser && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={styles["parent-root-menu__child__profile-window__modal"]}
                >
                    <h2>Привет, {user?.name}!</h2>
                    <div className={styles["parent-root-menu__child__profile-window__modal__main"]}>
                        <Link href={"/"} onClick={handleCloseMenu}>Управлять заметками</Link>
                        <Link href={"/"} onClick={handleCloseMenu}>Система ролей пользователей</Link>
                        <a href="https://nexsol.ru/" onClick={handleCloseMenu}>Перейти на основной сайт</a>
                    </div>
                    <div className={styles["parent-root-menu__child__profile-window__modal__profile"]}>
                        <button onClick={handleOpenProfile}>Открыть профиль</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ProfileModalMenu;