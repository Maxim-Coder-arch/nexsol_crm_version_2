import { motion, AnimatePresence } from "framer-motion";
import ClientForm from "./clientForm";
import UserProtected from "@/app/components/share/protected";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { AddClientButtonProps } from "@/types/clients/addClient.type";
import styles from "../index.module.scss";

const AddClientButton = ({
    workStatuses,
    physicalStatuses,
    isOpen,
    setIsOpen,
    form,
    actions,
}: AddClientButtonProps) => {
    const show = useTimeoutAnimationLoader();

    return (
        <UserProtected roles={["director", "moderator"]}>
            <motion.div
                className={styles["add-client-section"]}
                initial={{ opacity: 0, y: 15 }}
                animate={{
                    opacity: show ? 1 : 0,
                    y: show ? 0 : 15,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                }}
            >
                {!isOpen ? (
                    <motion.button
                        className={styles["add-client-btn"]}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(true)}
                    >
                        + Добавить клиента
                    </motion.button>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            className={styles["form-wrapper"]}
                            initial={{
                                opacity: 0,
                                y: -10,
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                                scale: 0.95,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                        >
                            <ClientForm
                                form={form}
                                actions={actions}
                                workStatuses={workStatuses}
                                physicalStatuses={physicalStatuses}
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