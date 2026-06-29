'use client';

import { menuItems } from "@/config-and-data/menu.cnf";
import Link from "next/link";
import styles from "./index.module.scss";
import { usePathname } from "next/navigation";
import UserIcon from "@/public/icons/menu/user";
import { useUser } from "@/app/hooks/useUser";
import { useContext, useState } from "react";
import { ProfileContext } from "@/app/context/modalContext";

const Menu = () => {
    const [openModalUser, setOpenModalUser] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();
    const context = useContext(ProfileContext);

    if (!context) return null;

    const { open, close } = context;

    const handleLinkClick = () => {
        setOpenModalUser(false);
        close();
    };

    return (
        user && <nav className={styles["parent-root-menu"]}>
            <div className={styles["parent-root-menu__child"]}>
                <div className={styles["parent-root-menu__child__logo"]}>
                    <span>Nexsol Crm</span>
                </div>
                <ul>
                    {menuItems.map((item, index) => {
                        return (
                            <li key={`fupX0p-${index}`} className={item.link === pathname ? styles["parent-root-menu__child__item--active"] : ""}>
                                <Link href={item.link}>
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

                    {openModalUser && <div className={styles["parent-root-menu__child__profile-window__modal"]}>
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
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Menu;