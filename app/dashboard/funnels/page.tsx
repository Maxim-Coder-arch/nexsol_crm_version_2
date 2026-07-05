"use client";
import { useState } from "react";
import IncludesFunnels from "./ui/includes";
import { FunnelType } from "@/types/funnels/ItemType.type";
import { IFunnel } from "@/types/funnels/funnel.type";
import { funnelTypes, stageTypes } from "@/config-and-data/funnels.cnf";
import TemplateContent from "@/app/components/share/template";
import { 
    useCreateFunnelMutation, 
    useDeleteFunnelMutation, 
    useGetFunnelsQuery,
    useUpdateFunnelMutation 
} from "@/store/client-api";

const FunnelsPage = () => {
    const { data: funnels = [], isLoading, error } = useGetFunnelsQuery(void 0) as {
        data: IFunnel[];
        isLoading: boolean;
        error: any;
    };
    
    const [createFunnel] = useCreateFunnelMutation();
    const [updateFunnel] = useUpdateFunnelMutation();
    const [deleteFunnel] = useDeleteFunnelMutation();
    const [filter, setFilter] = useState<FunnelType | 'all'>('all');
    const [editingFunnel, setEditingFunnel] = useState<IFunnel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddFunnel = async (data: { title: string; type: FunnelType }) => {
        try {
            await createFunnel(data).unwrap();
        } catch (error) {
            console.error('Failed to add funnel:', error);
        }
    };

    const handleDeleteFunnel = async (id: string) => {
        if (!confirm('Удалить воронку?')) return;
        try {
            await deleteFunnel(id).unwrap();
        } catch (error) {
            console.error('Failed to delete funnel:', error);
        }
    };

    const handleEditFunnel = (funnel: IFunnel) => {
        setEditingFunnel(funnel);
        setIsModalOpen(true);
    };

    const handleSaveFunnel = async (id: string, data: Partial<IFunnel>) => {
        try {
            await updateFunnel({ id, data }).unwrap();
            setIsModalOpen(false);
            setEditingFunnel(null);
        } catch (error) {
            console.error('Failed to update funnel:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingFunnel(null);
    };

    const filteredFunnels = filter === 'all' 
        ? funnels 
        : funnels.filter(f => f.type === filter);

    if (isLoading) {
        return <div>Загрузка воронок...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки</div>;
    }

    return (
        <TemplateContent>
            <IncludesFunnels
                funnels={funnels}
                filter={filter}
                editingFunnel={editingFunnel}
                isModalOpen={isModalOpen}
                filteredFunnels={filteredFunnels}
                funnelTypes={funnelTypes}
                stageTypes={stageTypes}
                onAddFunnel={handleAddFunnel}
                onDeleteFunnel={handleDeleteFunnel}
                onEditFunnel={handleEditFunnel}
                onSaveFunnel={handleSaveFunnel}
                onFilterChange={setFilter}
                onCloseModal={handleCloseModal}
            />
        </TemplateContent>
    );
};

export default FunnelsPage;