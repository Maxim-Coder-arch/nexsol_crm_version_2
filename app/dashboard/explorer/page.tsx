"use client";

import { useState, useEffect } from "react";
import IncludesFiles from "./ui/includes";
import TemplateContent from "@/app/components/share/template";
import { useDeleteFileMutation, useGetFilesQuery, useUploadFileMutation } from "@/store/client-api";
import { clientType } from "@/types/store-types/client.type";

export interface IFileCard {
    _id: string;
    filename: string;
    size: number;
    contentType: string;
    createdAt: Date;
}

const FilesPage = () => {
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
        } catch (error) {
            console.error("Failed to download file:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteFile(id).unwrap();
        } catch (error) {
            console.error("Failed to delete file:", error);
        }
    };

    const handleAddFile = () => {
        setShowAddForm(true);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
    };

    const handleFileSubmit = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const data = await uploadFile(formData).unwrap();
            setShowAddForm(false);
        } catch (error) {
            console.error("Failed to upload file:", error);
        }
    };

    if (isLoading) {
        return <div>Загрузка файлов...</div>;
    }

    if (error) {
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