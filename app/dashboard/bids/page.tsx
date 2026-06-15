"use client";
import { useState } from "react";
import { BidsStatus } from "../../../config-and-data/bids.cnf";
import IncludesBids from "./ui/includes";

const initialBidsData = [
    {
        username: "Max",
        createdAt: "02.06.2026, 20:56",
        useremail: "test@test.ru",
        usecontact: "https://vk.com/id120062926",
        comment: "This is comment for the test",
        status: BidsStatus.new,
    },
    {
        username: "Alex",
        createdAt: "02.06.2026, 20:56",
        useremail: "test@test.ru",
        usecontact: "https://vk.com/id120062926",
        comment: "This is comment for the test",
        status: BidsStatus.new,
    },
    {
        username: "Ivan",
        createdAt: "02.06.2026, 20:56",
        useremail: "test@test.ru",
        usecontact: "https://vk.com/id120062926",
        comment: "This is comment for the test",
        status: BidsStatus.new,
    },
    {
        username: "Max",
        createdAt: "02.06.2026, 20:56",
        useremail: "test@test.ru",
        usecontact: "https://vk.com/id120062926",
        comment: "This is comment for the test",
        status: BidsStatus.finished,
    },
    {
        username: "Alex",
        createdAt: "02.06.2026, 20:56",
        useremail: "test@test.ru",
        usecontact: "https://vk.com/id120062926",
        comment: "This is comment for the test",
        status: BidsStatus.inProgress,
    },
];

const columnsData = [
    { type: BidsStatus.new, title: "Новые" },
    { type: BidsStatus.inProgress, title: "В работе" },
    { type: BidsStatus.finished, title: "Завершенные" },
];

const BidsPage = () => {
    const [bids, setBids] = useState(initialBidsData);

    const handleStatusChange = (index: number, newStatus: BidsStatus) => {
        const updated = [...bids];
        updated[index] = { ...updated[index], status: newStatus };
        setBids(updated);
    };

    const handleDelete = (index: number) => {
        const updated = bids.filter((_, i) => i !== index);
        setBids(updated);
    };

    const handleAddBid = (newBid: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }) => {
        const now = new Date();
        const formattedDate = `${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`;
        
        const bidToAdd = {
            ...newBid,
            createdAt: formattedDate,
            status: BidsStatus.new,
        };
        
        setBids([bidToAdd, ...bids]);
    };

    return <IncludesBids
        bids={bids}
        handleStatusChange={handleStatusChange}
        handleDelete={handleDelete}
        handleAddBid={handleAddBid}
        columnsData={columnsData}
    />
};

export default BidsPage;