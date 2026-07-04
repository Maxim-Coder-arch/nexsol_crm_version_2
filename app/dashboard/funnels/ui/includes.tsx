import { IncludesFunnelsProps } from "@/types/funnels/includesFunnel.type";
import styles from "../index.module.scss";
import AddFunnel from "./addFunnel";
import EditFunnelModal from "./editFunnelModal";
import FunnelCard from "./funnelCard";
import FunnelFilter from "./funnelFilter";
import { motion } from "framer-motion";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const IncludesFunnels = ({
    filter,
    editingFunnel,
    isModalOpen,
    filteredFunnels,
    funnelTypes,
    stageTypes,
    onAddFunnel,
    onDeleteFunnel,
    onEditFunnel,
    onSaveFunnel,
    onFilterChange,
    onCloseModal,
}: IncludesFunnelsProps) => {

    const show = useTimeoutAnimationLoader();

    return (
        <section id="funnels">
            <div className={styles["funnels"]}>
                <AddFunnel onAdd={onAddFunnel} funnelTypes={funnelTypes} />
                
                <FunnelFilter 
                    activeFilter={filter} 
                    onFilterChange={onFilterChange} 
                    funnelTypes={funnelTypes} 
                />

                <motion.div 
                initial={{opacity: 0, scale: .9}}
                animate={show ? {opacity: 1, scale: 1} : {}}
                className={styles["funnels__grid"]}>
                    {filteredFunnels.length === 0 ? (
                        <div className={styles["funnels__empty"]}>Нет воронок</div>
                    ) : (
                        filteredFunnels.map(funnel => (
                            <FunnelCard 
                                key={funnel._id}
                                funnel={funnel}
                                onDelete={onDeleteFunnel}
                                onEdit={onEditFunnel}
                                funnelTypes={funnelTypes}
                                stageTypes={stageTypes}
                            />
                        ))
                    )}
                </motion.div>

                {editingFunnel && (
                    <EditFunnelModal
                        funnel={editingFunnel}
                        isOpen={isModalOpen}
                        onClose={onCloseModal}
                        stageTypes={stageTypes}
                        funnelTypes={funnelTypes}
                        onSave={onSaveFunnel}
                    />
                )}
            </div>
        </section>
    );
};

export default IncludesFunnels;