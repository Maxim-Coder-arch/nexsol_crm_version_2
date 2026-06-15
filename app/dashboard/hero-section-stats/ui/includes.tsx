import HeroSectionUiBids from "./bids";
import HeroSectionUiCharts from "./charts";
import HeroSectionUiDetailStats from "./detailStats";
import HeroSectionUiTeam from "./team";
import HeroSectionUiUsersCount from "./usersCount";
import styles from "../index.module.scss";

const HeroSectionUiIncludes = ({ chartPeriod, setChartPeriod, chartData,  chartLoading, users, bids, team, detailUsers }: any) => {
    return (
        <section id="hero-section-stats">
            <div className={styles["root-hero-section-stats"]}>
                
                <HeroSectionUiCharts 
                    chartPeriod={chartPeriod}
                    setChartPeriod={setChartPeriod}
                    chartData={chartData}
                    loading={chartLoading}
                />
                
                <HeroSectionUiUsersCount users={users} />

                <HeroSectionUiBids bids={bids} />

                <HeroSectionUiTeam team={team} />
                
                <HeroSectionUiDetailStats detailUsers={detailUsers} />
                
            </div>
        </section>
    )
}

export default HeroSectionUiIncludes;