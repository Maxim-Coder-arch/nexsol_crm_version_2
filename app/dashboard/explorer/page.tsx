"use client";

export interface IFileCard {
    _id: string;
    filename: string;
    size: number;
    contentType: string;
    createdAt: Date;
}

import { useState, useEffect } from "react";
import IncludesFiles from "./ui/includes";
import TemplateContent from "@/app/components/share/template";

const FilesPage = () => {
    const [files, setFiles] = useState<IFileCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchFiles = async () => {
        try {
            const response = await fetch("/api/files");
            if (response.ok) {
                const data = await response.json();
                setFiles(data);
            }
        } catch (error) {
            console.error("Failed to fetch files:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDownload = async (id: string) => {
        console.log("rgerthbrtnb")
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
            const response = await fetch(`/api/files/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setFiles(prev => prev.filter(f => f._id !== id));
            }
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
            const response = await fetch("/api/files/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setFiles(prev => [{
                    _id: data.fileId,
                    filename: data.filename,
                    size: data.size,
                    contentType: file.name.split('.').pop() || 'unknown',
                    createdAt: new Date(),
                }, ...prev]);
                setShowAddForm(false);
            } else {
                const error = await response.json();
                alert(error.error || 'Ошибка при загрузке файла');
            }
        } catch (error) {
            console.error("Failed to upload file:", error);
            alert('Ошибка при загрузке файла');
        }
    };

    if (loading) {
        return <div>Загрузка файлов...</div>;
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