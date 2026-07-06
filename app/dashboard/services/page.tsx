"use client";
import { useEffect, useState } from "react";
import IncludesServices from "./ui/includes";
import { IService } from "@/types/services/service.type";
import TemplateContent from "@/app/components/share/template";
import { useCreateServiceMutation, useDeleteServiceMutation, useGetServicesQuery } from "@/store/client-api";
import { clientType } from "@/types/store-types/client.type";

const Services = () => {
    const { data: services = [], isLoading, error } = useGetServicesQuery(void 0) as clientType<IService>;
    const [deleteService] = useDeleteServiceMutation();
    const [createService] = useCreateServiceMutation();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        url: "",
    });

    const handleAdd = async () => {
        try {
            await createService(formData).unwrap();
        } catch {
            console.error("failed to add service");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteService(id).unwrap();
        } catch {
            console.error("failed to delete service");
        }
    };

    return (
        <TemplateContent>
            <IncludesServices 
                services={services}
                handleDelete={handleDelete}
                setFormData={setFormData}
                handleAdd={handleAdd}
                formData={formData}
            />
        </TemplateContent>
    )
};

export default Services;