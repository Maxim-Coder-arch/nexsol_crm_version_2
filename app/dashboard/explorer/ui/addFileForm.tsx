import { motion } from "framer-motion";
import { AddFileFormProps } from "@/types/explorer/addFileForm.type";
import { formatSize } from "@/helpers/explorer/formatSize";
import { handleFileSelect } from "@/helpers/explorer/handleFileSelect";
import { handleDrop } from "@/helpers/explorer/handelFileDrop";
import { handleDragOver } from "@/helpers/explorer/handleDragOver";
import { handleDragLeave } from "@/helpers/explorer/handleDragLeave";
import { handleSubmit } from "@/helpers/explorer/submit";
import styles from "../index.module.scss";

const AddFileForm = ({ 
    onAdd, 
    onCancel, 
    selectedFile,
    setSelectedFile,
    isShared,
    setIsShared,
    dragOver,
    setDragOver,
    fileInputRef,
  }: AddFileFormProps) => {
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
                onSubmit={(e) => handleSubmit(e, selectedFile, isShared, onAdd)}
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
                    onDrop={(e) => handleDrop(e, setDragOver, setSelectedFile)}
                    onDragOver={(e) => handleDragOver(e, setDragOver)}
                    onDragLeave={(e) => handleDragLeave(e, setDragOver)}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={(e) => handleFileSelect(e, setSelectedFile)}
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