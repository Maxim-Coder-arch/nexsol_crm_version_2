import { IncludesFunnelsProps } from "@/types/funnels/includesFunnel.type";
import styles from "../index.module.scss";
import AddFunnel from "./addFunnel";
import EditFunnelModal from "./editFunnelModal";
import FunnelCard from "./funnelCard";
import FunnelFilter from "./funnelFilter";

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

    return (
        <section id="funnels">
            <div className={styles["funnels"]}>
                <AddFunnel onAdd={onAddFunnel} funnelTypes={funnelTypes} />
                
                <FunnelFilter 
                    activeFilter={filter} 
                    onFilterChange={onFilterChange} 
                    funnelTypes={funnelTypes} 
                />

                <div className={styles["funnels__grid"]}>
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
                </div>

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