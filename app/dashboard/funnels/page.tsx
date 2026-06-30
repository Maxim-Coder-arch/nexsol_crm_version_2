"use client";
import { useState } from "react";
import IncludesFunnels from "./ui/includes";

export type FunnelType = 'sales' | 'attraction' | 'b2b';
export type StageType = 'TOFU' | 'MOFU' | 'BOFU';

export interface IFunnelItem {
    id: string;
    title: string;
    type: StageType;
}

export interface IFunnel {
    id: string;
    title: string;
    type: FunnelType;
    items: IFunnelItem[];
    createdAt: Date;
}

const mockFunnels: IFunnel[] = [
    {
        id: '1',
        title: 'Продажа софта',
        type: 'sales',
        items: [
            { id: '1-1', title: 'Посетитель', type: 'TOFU' },
            { id: '1-2', title: 'Лид', type: 'MOFU' },
            { id: '1-3', title: 'Клиент', type: 'BOFU' },
        ],
        createdAt: new Date(),
    },
    {
        id: '2',
        title: 'Привлечение через контент',
        type: 'attraction',
        items: [
            { id: '2-1', title: 'Просмотр статьи', type: 'TOFU' },
            { id: '2-2', title: 'Подписка', type: 'MOFU' },
            { id: '2-3', title: 'Заявка', type: 'BOFU' },
        ],
        createdAt: new Date(),
    },
    {
        id: '3',
        title: 'B2B переговоры',
        type: 'b2b',
        items: [
            { id: '3-1', title: 'Знакомство', type: 'TOFU' },
            { id: '3-2', title: 'Презентация', type: 'MOFU' },
            { id: '3-3', title: 'Договор', type: 'BOFU' },
            { id: '3-4', title: 'Оплата', type: 'BOFU' },
        ],
        createdAt: new Date(),
    },
];

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
    const [funnels, setFunnels] = useState<IFunnel[]>(mockFunnels);
    const [filter, setFilter] = useState<FunnelType | 'all'>('all');
    const [editingFunnel, setEditingFunnel] = useState<IFunnel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddFunnel = (data: { title: string; type: FunnelType }) => {
        const newFunnel: IFunnel = {
            id: Date.now().toString(),
            title: data.title,
            type: data.type,
            items: [
                { id: '1', title: 'Шаг 1', type: 'TOFU' },
                { id: '2', title: 'Шаг 2', type: 'MOFU' },
                { id: '3', title: 'Шаг 3', type: 'BOFU' },
            ],
            createdAt: new Date(),
        };
        setFunnels([newFunnel, ...funnels]);
    };

    const handleDeleteFunnel = (id: string) => {
        setFunnels(funnels.filter(f => f.id !== id));
    };

    const handleEditFunnel = (funnel: IFunnel) => {
        setEditingFunnel(funnel);
        setIsModalOpen(true);
    };

    const handleSaveFunnel = (id: string, data: Partial<IFunnel>) => {
        setFunnels(prev => prev.map(f => 
            f.id === id ? { ...f, ...data } : f
        ));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingFunnel(null);
    };

    const filteredFunnels = filter === 'all' 
        ? funnels 
        : funnels.filter(f => f.type === filter);

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