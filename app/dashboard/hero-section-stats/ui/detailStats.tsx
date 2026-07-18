import { HeroSectionUiDetailStatsProps } from "@/types/hero-section/uiDetailStatsProps";
import { motion } from "framer-motion";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import styles from "../index.module.scss";

const HeroSectionUiDetailStats = ({ detailUsers }: HeroSectionUiDetailStatsProps) => {
    const show = useTimeoutAnimationLoader();
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={show ? {opacity: 1} : {}}
        className={styles["root-hero-section-stats__detail-stats"]}>
            <h2>Пользователи</h2>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Страница</td>
                        <td>Источник</td>
                        <td>Устройство</td>
                        <td>Время</td>
                    </tr>
                </thead>
                <tbody>
                    {detailUsers.map((user, index) => {
                        return (
                            <tr key={`scwX0t6tgg6$21dp-${index}`}>
                                <td>{user._id}</td>
                                <td>{user.page}</td>
                                <td>{user.source}</td>
                                <td>{user.device}</td>
                                <td>{user.time}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </motion.div>
    )
}

export default HeroSectionUiDetailStats;