import { IBurger } from "@/types/menu/burger.type";
import styles from "../index.module.scss";

const Burger = ({ isMobileMenuOpen, setIsMobileMenuOpen }: IBurger) => {
    return (
        <button
            className={styles["parent-root-menu__child__burger"]}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
        >
            <span className={`${styles["burger-line"]} ${isMobileMenuOpen ? styles["burger-line--active"] : ""}`} />
            <span className={`${styles["burger-line"]} ${isMobileMenuOpen ? styles["burger-line--active"] : ""}`} />
            <span className={`${styles["burger-line"]} ${isMobileMenuOpen ? styles["burger-line--active"] : ""}`} />
        </button>
    )
}

export default Burger;