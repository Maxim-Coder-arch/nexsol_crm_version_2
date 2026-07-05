// components/layout/Menu/index.tsx
'use client';

import { menuItems } from "@/config-and-data/menu.cnf";
import Link from "next/link";
import styles from "./index.module.scss";
import { usePathname } from "next/navigation";
import UserIcon from "@/public/icons/menu/user";
import { useUser } from "@/app/hooks/useUser";
import { useContext, useState, useEffect } from "react";
import { ProfileContext } from "@/app/context/modalContext";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
    const [openModalUser, setOpenModalUser] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();
    const context = useContext(ProfileContext);

    if (!context) return null;

    const { open, close } = context;

    const handleLinkClick = () => {
        setOpenModalUser(false);
        setIsMobileMenuOpen(false);
        close();
    };

    // Закрываем мобильное меню при переходе
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        user && (
            <nav className={styles["parent-root-menu"]}>
                <div className={styles["parent-root-menu__child"]}>
                    <div className={styles["parent-root-menu__child__logo"]}>
                        <span>Nexsol Crm</span>
                    </div>

                    {/* Кнопка бургер-меню */}
                    <button
                        className={styles["parent-root-menu__child__burger"]}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles["burger-line"]} ${isMobileMenuOpen ? styles["burger-line--active"] : ""}`} />
                        <span className={`${styles["burger-line"]} ${isMobileMenuOpen ? styles["burger-line--active"] : ""}`} />
                        <span className={`${styles["burger-line"]} ${isMobileMenuOpen ? styles["burger-line--active"] : ""}`} />
                    </button>

                    <ul className={`${styles["parent-root-menu__child__list"]} ${isMobileMenuOpen ? styles["parent-root-menu__child__list--open"] : ""}`}>
                        {menuItems.map((item, index) => {
                            const isActive = item.link === pathname;
                            return (
                                <li
                                    key={`fupX0p-${index}`}
                                    className={isActive ? styles["parent-root-menu__child__item--active"] : ""}
                                >
                                    <Link href={item.link} onClick={handleLinkClick}>
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <div className={styles["parent-root-menu__child__profile-window"]}>
                        <button onClick={() => setOpenModalUser(prev => !prev)}>
                            <UserIcon />
                            <p>{user?.name}</p>
                        </button>

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
                                        <Link href={"/"} onClick={handleLinkClick}>Управлять заметками</Link>
                                        <Link href={"/"} onClick={handleLinkClick}>Система ролей пользователей</Link>
                                        <a href="nexsol.ru" onClick={handleLinkClick}>Перейти на основной сайт</a>
                                    </div>
                                    <div className={styles["parent-root-menu__child__profile-window__modal__profile"]}>
                                        <button onClick={() => {
                                            setOpenModalUser(false);
                                            open();
                                        }}>Открыть профиль</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>
        )
    )
}

export default Menu;