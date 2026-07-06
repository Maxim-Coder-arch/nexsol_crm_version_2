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
import { clientType } from "@/types/store-types/client.type";
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";

const FunnelsPage = () => {
    const dispatch = useAppDispatch();
    const { data: funnels = [], isLoading, error } = useGetFunnelsQuery(void 0) as clientType<IFunnel>;
    
    const [createFunnel] = useCreateFunnelMutation();
    const [updateFunnel] = useUpdateFunnelMutation();
    const [deleteFunnel] = useDeleteFunnelMutation();
    const [filter, setFilter] = useState<FunnelType | 'all'>('all');
    const [editingFunnel, setEditingFunnel] = useState<IFunnel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddFunnel = async (data: { title: string; type: FunnelType }) => {
        try {
            await createFunnel(data).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Воронка создана',
                message: `Воронка "${data.title}" успешно создана`,
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось создать воронку',
                duration: 4000,
            }));
        }
    };

    const handleDeleteFunnel = async (id: string) => {
        try {
            await deleteFunnel(id).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Удалено!',
                message: 'Воронка успешно удалена',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось удалить воронку',
                duration: 4000,
            }));
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
            dispatch(showToast({
                type: 'success',
                title: 'Обновлено!',
                message: 'Воронка успешно обновлена',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось обновить воронку',
                duration: 4000,
            }));
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
        dispatch(showToast({
            type: 'error',
            title: 'Ошибка загрузки',
            message: 'Не удалось загрузить воронки',
            duration: 4000,
        }));
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