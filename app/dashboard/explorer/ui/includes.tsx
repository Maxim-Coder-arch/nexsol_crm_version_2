import { motion } from "framer-motion";
import FileGrid from "./fileGrid";
import FileHeader from "./fileHeader";
import AddFileButton from "./addFileButton";
import AddFileForm from "./addFileForm";
import styles from "../index.module.scss";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { IncludesFilesProps } from "@/types/explorer/includesFile.type";

const IncludesFiles = ({
    files,
    showAddForm,
    onDownload,
    onDelete,
    onAddFile,
    onCancelAdd,
    onFileSubmit,
}: IncludesFilesProps) => {
    const show = useTimeoutAnimationLoader();

    return (
        <section id="files">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={styles["files"]}
            >
                <FileHeader count={files.length} />

                {!showAddForm ? (
                    <AddFileButton onClick={onAddFile} />
                ) : (
                    <AddFileForm onAdd={onFileSubmit} onCancel={onCancelAdd} />
                )}

                <FileGrid files={files} onDownload={onDownload} onDelete={onDelete} />
            </motion.div>
        </section>
    );
};

export default IncludesFiles;


