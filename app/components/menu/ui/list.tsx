import Link from "next/link";
import { menuItems } from "@/configs/components/menu/menu.cnf";
import { IMenuList } from "@/types/menu/menuList.type";
import styles from "../index.module.scss";

const MenuList = ({ isMobileMenuOpen, pathname, handleCloseMenu }: IMenuList) => {
    return (
        <ul className={`${styles["parent-root-menu__child__list"]} ${isMobileMenuOpen ? styles["parent-root-menu__child__list--open"] : ""}`}>
            {menuItems.map((item, index) => {
                const isActive = item.link === pathname;
                return (
                    <li
                        key={`fupX0p-${index}`}
                        className={isActive ? styles["parent-root-menu__child__item--active"] : ""}
                    >
                        <Link href={item.link} onClick={handleCloseMenu}>
                            {item.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default MenuList;