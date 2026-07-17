import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientForm from "./clientForm";
import styles from "../index.module.scss";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import UserProtected from "@/app/components/share/protected";

interface AddClientButtonProps {
    workStatuses: readonly { value: string; label: string }[];
    physicalStatuses: readonly { value: string; label: string }[];
    onAdd: (client: any) => void;
}

const AddClientButton = ({ workStatuses, physicalStatuses, onAdd }: AddClientButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const show = useTimeoutAnimationLoader();

    return (
        <UserProtected roles={["director", "moderator"]}>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles["add-client-section"]}
            >
                {!isOpen ? (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(true)}
                        className={styles["add-client-btn"]}
                    >
                        + Добавить клиента
                    </motion.button>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={styles["form-wrapper"]}
                        >
                            <ClientForm
                                workStatuses={workStatuses}
                                physicalStatuses={physicalStatuses}
                                onSubmit={(client) => {
                                    onAdd(client);
                                    setIsOpen(false);
                                }}
                                onCancel={() => setIsOpen(false)}
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
            </motion.div>
        </UserProtected>
    );
};

export default AddClientButton;