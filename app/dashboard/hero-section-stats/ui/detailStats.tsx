import { HeroSectionUiDetailStatsProps } from "@/types/hero-section/uiDetailStatsProps";
import styles from "../index.module.scss";

const HeroSectionUiDetailStats = ({ detailUsers }: HeroSectionUiDetailStatsProps) => {
    return (
        <div className={styles["root-hero-section-stats__detail-stats"]}>
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
        </div>
    )
}

export default HeroSectionUiDetailStats;


