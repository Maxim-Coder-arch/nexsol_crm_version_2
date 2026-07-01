"use client";
import { useEffect, useState } from "react";
import IncludesFunnels from "./ui/includes";

export type FunnelType = 'sales' | 'attraction' | 'b2b';
export type StageType = 'TOFU' | 'MOFU' | 'BOFU';

export interface IFunnelItem {
    id: string;
    title: string;
    type: StageType;
}

export interface IFunnel {
    _id: string;
    title: string;
    type: FunnelType;
    items: IFunnelItem[];
    createdAt: Date;
}

const funnelTypes: { value: FunnelType; label: string }[] = [
    { value: 'sales', label: 'Продажи' },
    { value: 'attraction', label: 'Привлечение' },
    { value: 'b2b', label: 'B2B' },
];

const stageTypes: { value: StageType; label: string; color: string }[] = [
    { value: 'TOFU', label: 'TOFU', color: '#4CAF50' },
    { value: 'MOFU', label: 'MOFU', color: '#FF9800' },
    { value: 'BOFU', label: 'BOFU', color: '#F44336' },
];

const FunnelsPage = () => {
    const [funnels, setFunnels] = useState<IFunnel[]>([]);
    const [filter, setFilter] = useState<FunnelType | 'all'>('all');
    const [editingFunnel, setEditingFunnel] = useState<IFunnel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchFunnels = async () => {
        try {
            const response = await fetch("/api/funnels");
            const json = await response.json();
            setFunnels(json);
        } catch (error) {
            console.error('Failed to fetch funnels:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFunnels();
    }, []);

    const handleAddFunnel = async (data: { title: string; type: FunnelType }) => {
        try {
            const response = await fetch("/api/funnels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    type: data.type,
                })
            });

            if (response.ok) {
                const createdFunnel = await response.json();
                setFunnels(prev => [createdFunnel, ...prev]);
            } else {
                const error = await response.json();
                alert(error.error || 'Ошибка при создании воронки');
            }
        } catch (error) {
            console.error('Failed to add funnel:', error);
            alert('Ошибка при создании воронки');
        }
    };

    const handleDeleteFunnel = async (id: string) => {

        try {
            const response = await fetch(`/api/funnels/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setFunnels(prev => prev.filter(f => f._id !== id));
            } else {
                const error = await response.json();
                alert(error.error || 'Ошибка при удалении воронки');
            }
        } catch (error) {
            console.error('Failed to delete funnel:', error);
            alert('Ошибка при удалении воронки');
        }
    };

    const handleEditFunnel = (funnel: IFunnel) => {
        setEditingFunnel(funnel);
        setIsModalOpen(true);
    };

    const handleSaveFunnel = async (id: string, data: Partial<IFunnel>) => {
        try {
            const response = await fetch(`/api/funnels/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: data.title,
                    type: data.type,
                    items: data.items,
                })
            });

            if (response.ok) {
                const updatedFunnel = await response.json();
                setFunnels(prev => prev.map(f => 
                    f._id === id ? updatedFunnel : f
                ));
                setIsModalOpen(false);
                setEditingFunnel(null);
            } else {
                const error = await response.json();
            }
        } catch (error) {
            alert('Ошибка при обновлении воронки');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingFunnel(null);
    };

    const filteredFunnels = filter === 'all' 
        ? funnels 
        : funnels.filter(f => f.type === filter);

    if (loading) {
        return <div>Загрузка воронок...</div>;
    }

    return (
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
    );
};

export default FunnelsPage;