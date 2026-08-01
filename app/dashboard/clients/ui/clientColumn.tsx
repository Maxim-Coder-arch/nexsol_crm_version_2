import { motion } from "framer-motion";
import ClientCard from "./clientCard";
import EmptyState from "./emptyState";
import { ClientsColumnProps } from "@/types/clients/clientColumn.type";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { containerVariants__client as containerVariants } from "@/configs/clients/clients.cnf";
import { cardVariants__client as cardVariants } from "@/configs/clients/clients.cnf";
import styles from "../index.module.scss";

const ClientsColumn = ({
    title,
    clients,
    workStatuses,
    physicalStatuses,
    onUpdate,
    onDelete
}: ClientsColumnProps) => {
    const show = useTimeoutAnimationLoader();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={styles["clients-column"]}
        >
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
                transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
                className={styles["clients-column__header"]}
            >
                <h2>{title}</h2>
                <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {clients.length}
                </motion.span>
            </motion.div>

            <motion.div
                key={clients.length}
                variants={containerVariants}
                initial="hidden"
                animate={show ? "visible" : "hidden"}
                className={styles["clients-column__data"]}
            >
                {clients.length === 0 ? (
                    <EmptyState />
                ) : (
                    clients.map((client) => (
                        <motion.div
                            key={client._id}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.15 },
                            }}
                        >
                            <ClientCard
                                client={client}
                                workStatuses={workStatuses}
                                physicalStatuses={physicalStatuses}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        </motion.div>
                    ))
                )}
            </motion.div>
        </motion.div>
    );
};

export default ClientsColumn;