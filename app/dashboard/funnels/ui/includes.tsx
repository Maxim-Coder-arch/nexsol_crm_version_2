import styles from "../index.module.scss";
import AddFunnel from "./addFunnel";
import EditFunnelModal from "./editFunnelModal";
import FunnelCard from "./funnelCard";
import FunnelFilter from "./funnelFilter";
import { IFunnel, FunnelType, StageType } from "../page";

interface IncludesFunnelsProps {
    funnels: IFunnel[];
    filter: FunnelType | 'all';
    editingFunnel: IFunnel | null;
    isModalOpen: boolean;
    filteredFunnels: IFunnel[];
    funnelTypes: { value: FunnelType; label: string }[];
    stageTypes: { value: StageType; label: string; color: string }[];
    onAddFunnel: (data: { title: string; type: FunnelType }) => void;
    onDeleteFunnel: (id: string) => void;
    onEditFunnel: (funnel: IFunnel) => void;
    onSaveFunnel: (id: string, data: Partial<IFunnel>) => void;
    onFilterChange: (filter: FunnelType | 'all') => void;
    onCloseModal: () => void;
}

const IncludesFunnels = ({
    funnels,
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