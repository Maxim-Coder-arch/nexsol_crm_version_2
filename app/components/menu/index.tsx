'use client';

import { menuItems } from "@/config-and-data/menu.cnf";
import Link from "next/link";
import styles from "./index.module.scss";
import { usePathname } from "next/navigation";

const Menu = () => {
    const pathname = usePathname();

    return (
        <nav className={styles["parent-root-menu"]}>
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
            </div>
        </nav>
    )
}

export default Menu;