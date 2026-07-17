'use client';
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../index.module.scss";

interface AddFileFormProps {
    onAdd: (file: File, isShared: boolean) => void;
    onCancel: () => void;
}

const AddFileForm = ({ onAdd, onCancel }: AddFileFormProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isShared, setIsShared] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            onAdd(selectedFile, isShared);
        }
    };

    const formatSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={styles["add-file-form"]}
        >
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                onSubmit={handleSubmit}
                className={styles["add-file-form__form"]}
            >
                <div className={styles["add-file-form__header"]}>
                    <h3>Загрузка файла</h3>
                    <button type="button" onClick={onCancel} className={styles["add-file-form__close"]}>
                        ✕
                    </button>
                </div>

                <div
                    className={`${styles["add-file-form__dropzone"]} ${dragOver ? styles["add-file-form__dropzone--drag"] : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className={styles["add-file-form__input"]}
                    />
                    {selectedFile ? (
                        <div className={styles["add-file-form__file-info"]}>
                            <span className={styles["add-file-form__file-icon"]}>📄</span>
                            <div>
                                <p className={styles["add-file-form__file-name"]}>{selectedFile.name}</p>
                                <p className={styles["add-file-form__file-size"]}>
                                    {formatSize(selectedFile.size)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className={styles["add-file-form__file-remove"]}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className={styles["add-file-form__dropzone-content"]}>
                            <span className={styles["add-file-form__dropzone-icon"]}>📁</span>
                            <p>Перетащите файл сюда или кликните для выбора</p>
                            <span className={styles["add-file-form__dropzone-hint"]}>Поддерживаются любые типы файлов</span>
                        </div>
                    )}
                </div>

                <div className={styles["add-file-form__shared"]}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isShared}
                            onChange={(e) => setIsShared(e.target.checked)}
                        />
                        <span>Сделать файл публичным (доступен всем пользователям)</span>
                    </label>
                </div>

                <div className={styles["add-file-form__actions"]}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className={`${styles["add-file-form__submit"]} ${!selectedFile ? styles["add-file-form__submit--disabled"] : ''}`}
                        disabled={!selectedFile}
                    >
                        Загрузить
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={onCancel}
                        className={styles["add-file-form__cancel"]}
                    >
                        Отмена
                    </motion.button>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default AddFileForm;