"use client";

import { useState } from "react";
import IncludesFiles from "./ui/includes";
import TemplateContent from "@/app/components/share/template";
import { useDeleteFileMutation, useGetFilesQuery, useUploadFileMutation } from "@/store/client-api";
import { clientType } from "@/types/store-types/client.type";
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";
import { IFileCard } from "@/types/explorer/fileCard.type";
import { MAX_FILE_SIZE } from "@/config-and-data/explorer.cnf";

const FilesPage = () => {
    const dispatch = useAppDispatch();
    const { data: files = [], isLoading, error } = useGetFilesQuery(void 0) as clientType<IFileCard>;
    const [uploadFile] = useUploadFileMutation();
    const [deleteFile] = useDeleteFileMutation();
    const [showAddForm, setShowAddForm] = useState(false);

    const handleDownload = async (id: string) => {
        try {
            const response = await fetch(`/api/files/${id}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const contentDisposition = response.headers.get('Content-Disposition');
                const filename = contentDisposition
                    ? contentDisposition.split('filename=')[1]?.replace(/["']/g, '') || 'file'
                    : 'file';
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось скачать файл',
                duration: 4000,
            }));
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteFile(id).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Удалено!',
                message: 'Файл успешно удалён',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось удалить файл',
                duration: 4000,
            }));
        }
    };

    const handleAddFile = () => {
        setShowAddForm(true);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
    };

    const handleFileSubmit = async (file: File, isShared: boolean) => {
        if (file.size > MAX_FILE_SIZE) {
            dispatch(showToast({
                type: 'warning',
                title: 'Слишком большой файл',
                message: 'Максимальный размер файла — 100 МБ',
                duration: 4000,
            }));
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('isShared', String(isShared));

        try {
            await uploadFile(formData).unwrap();
            setShowAddForm(false);
            dispatch(showToast({
                type: 'success',
                title: 'Загружено!',
                message: `Файл "${file.name}" успешно загружен${isShared ? ' (публичный)' : ''}`,
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось загрузить файл',
                duration: 4000,
            }));
        }
    };

    if (isLoading) {
        return <div>Загрузка файлов...</div>;
    }

    if (error) {
        dispatch(showToast({
            type: 'error',
            title: 'Ошибка загрузки',
            message: 'Не удалось загрузить файлы',
            duration: 4000,
        }));
        return <div>Ошибка загрузки</div>;
    }

    return (
        <TemplateContent>
            <IncludesFiles
                files={files}
                showAddForm={showAddForm}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onAddFile={handleAddFile}
                onCancelAdd={handleCancelAdd}
                onFileSubmit={handleFileSubmit}
            />
        </TemplateContent>
    );
};

export default FilesPage;