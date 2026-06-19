"use client";
import { useEffect, useState } from "react";
import { BidsStatus, columnsData } from "@/config-and-data/bids.cnf";
import IncludesBids from "./ui/includes";
import { IBid } from "@/types/bids/bid.type";

const BidsPage = () => {
    const [bids, setBids] = useState<IBid[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBids = async () => {
        try {
            const response = await fetch("/api/bids");
            const data = await response.json();
            setBids(data);
        } catch (error) {
            console.error('Failed to fetch bids:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBids();
    }, []);

    const handleStatusChange = async (id: string, newStatus: BidsStatus) => {
        try {
            const response = await fetch(`/api/bids/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            
            if (response.ok) {
                setBids(prev => 
                    prev.map(bid => 
                        bid._id === id ? { ...bid, status: newStatus } : bid
                    )
                );
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (id: string) => {;
        try {
            const response = await fetch(`/api/bids/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                setBids(prev => prev.filter(bid => bid._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete bid:', error);
        }
    };

    const handleAddBid = async (newBid: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }) => {
        try {
            const response = await fetch("/api/bids", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newBid.username,
                    email: newBid.useremail,
                    contact: newBid.usecontact,
                    message: newBid.comment,
                }),
            });
            
            if (response.ok) {
                const createdBid = await response.json();
                setBids(prev => [createdBid, ...prev]);
            }
        } catch (error) {
            console.error('Failed to add bid:', error);
        }
    };

    return (
        <IncludesBids
            bids={bids}
            handleStatusChange={handleStatusChange}
            handleDelete={handleDelete}
            handleAddBid={handleAddBid}
            columnsData={columnsData}
        />
    );
};

export default BidsPage;