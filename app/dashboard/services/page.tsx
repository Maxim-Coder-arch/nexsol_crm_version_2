"use client";
import { useState } from "react";
import IncludesServices from "./ui/includes";
import { IService } from "@/types/services/service.type";
import TemplateContent from "@/app/components/share/template";
import { useCreateServiceMutation, useDeleteServiceMutation, useGetServicesQuery } from "@/store/client-api";
import { clientType } from "@/types/store-types/client.type";
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";

const Services = () => {
    const dispatch = useAppDispatch();
    const { data: services = [], isLoading, error } = useGetServicesQuery(void 0) as clientType<IService>;
    const [deleteService] = useDeleteServiceMutation();
    const [createService] = useCreateServiceMutation();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        url: "",
    });

    const validateUrl = (url: string): boolean => {
        if (!url) return true;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleAdd = async () => {
        const trimmedTitle = formData.title.trim();
        const trimmedUrl = formData.url.trim();

        if (!trimmedTitle) {
            dispatch(showToast({
                type: 'warning',
                title: 'Заполните поле',
                message: 'Название сервиса обязательно',
                duration: 3000,
            }));
            return;
        }

        if (!trimmedUrl) {
            dispatch(showToast({
                type: 'warning',
                title: 'Заполните поле',
                message: 'Ссылка на сервис обязательна',
                duration: 3000,
            }));
            return;
        }

        if (!validateUrl(trimmedUrl)) {
            dispatch(showToast({
                type: 'warning',
                title: 'Неверный формат',
                message: 'Пожалуйста, введите корректную ссылку (https://...)',
                duration: 3000,
            }));
            return;
        }

        try {
            await createService({
                title: trimmedTitle,
                description: formData.description.trim() || '',
                url: trimmedUrl,
            }).unwrap();
            
            dispatch(showToast({
                type: 'success',
                title: 'Успешно!',
                message: 'Сервис успешно добавлен',
                duration: 3000,
            }));

            setFormData({
                title: "",
                description: "",
                url: "",
            });
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось добавить сервис',
                duration: 4000,
            }));
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteService(id).unwrap();
            
            dispatch(showToast({
                type: 'success',
                title: 'Успешно!',
                message: 'Сервис успешно удалён',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось удалить сервис',
                duration: 4000,
            }));
        }
    };

    if (isLoading) {
        return <div>Загрузка сервисов...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки</div>;
    }

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