"use client";
import { useState, useEffect } from "react";
import IncludesFiles from "./ui/includes";

export interface IFileCard {
    _id: string;
    filename: string;
    size: number;
    contentType: string;
    createdAt: Date;
}

const mockFiles: IFileCard[] = [
    {
        _id: "1",
        filename: "документ.pdf",
        size: 1024 * 1024 * 2.5,
        contentType: "pdf",
        createdAt: new Date("2026-07-01T10:30:00"),
    },
    {
        _id: "2",
        filename: "отчет.xlsx",
        size: 1024 * 512,
        contentType: "xlsx",
        createdAt: new Date("2026-07-02T14:20:00"),
    },
    {
        _id: "3",
        filename: "презентация.pptx",
        size: 1024 * 1024 * 5,
        contentType: "pptx",
        createdAt: new Date("2026-07-03T09:15:00"),
    },
    {
        _id: "4",
        filename: "заметки.txt",
        size: 1024 * 15,
        contentType: "txt",
        createdAt: new Date("2026-07-04T16:45:00"),
    },
    {
        _id: "5",
        filename: "фото.jpg",
        size: 1024 * 1024 * 3.2,
        contentType: "jpg",
        createdAt: new Date("2026-07-05T11:00:00"),
    },
    {
        _id: "6",
        filename: "архив.zip",
        size: 1024 * 1024 * 8,
        contentType: "zip",
        createdAt: new Date("2026-07-06T08:30:00"),
    },
];

const FilesPage = () => {
    const [files, setFiles] = useState<IFileCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFiles(mockFiles);
            setLoading(false);
        }, 500);
    }, []);

    const handleDownload = (id: string) => {
        console.log("Download file:", id);
    };

    const handleDelete = (id: string) => {
        if (confirm("Удалить файл?")) {
            setFiles(prev => prev.filter(f => f._id !== id));
        }
    };

    const handleAddFile = () => {
        setShowAddForm(true);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
    };

    const handleFileSubmit = (file: File) => {
        const newFile: IFileCard = {
            _id: Date.now().toString(),
            filename: file.name,
            size: file.size,
            contentType: file.name.split('.').pop() || 'unknown',
            createdAt: new Date(),
        };
        setFiles(prev => [newFile, ...prev]);
        setShowAddForm(false);
    };

    if (loading) {
        return <div>Загрузка файлов...</div>;
    }

    return (
        <IncludesFiles
            files={files}
            showAddForm={showAddForm}
            onDownload={handleDownload}
            onDelete={handleDelete}
            onAddFile={handleAddFile}
            onCancelAdd={handleCancelAdd}
            onFileSubmit={handleFileSubmit}
        />
    );
};

export default FilesPage;