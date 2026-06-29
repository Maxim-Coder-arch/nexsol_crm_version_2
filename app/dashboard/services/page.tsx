"use client";
import { useEffect, useState } from "react";
import IncludesServices from "./ui/includes";

export interface IService {
    _id: string;
    title: string;
    description: string;
    url: string;
    createdAt: number;
}

const Services = () => {
    const [services, setServices] = useState<IService[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        url: "",
    });

    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch("/api/services");
            const json = await response.json();
            setServices(json);
        }

        fetchServices();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("/api/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application-json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    url: formData.url,
                })
            });
    
            if (response.ok) {
                const createdService = await response.json();
                setServices(prev => [createdService, ...prev]);
            }
        } catch {
            console.error("failed to add service");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/services/${id}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setServices(prev => prev.filter(service => service._id !== id));
            }
        } catch {
            console.error("failed to delete service");
        }
    };

    return <IncludesServices 
        services={services}
        handleDelete={handleDelete}
        setFormData={setFormData}
        handleAdd={handleAdd}
        formData={formData}
    />
};

export default Services;