import { motion } from "framer-motion";
import { IListOfServicesProps } from "@/types/services/listOfServices.type";
import styles from "../index.module.scss";
import CloseIcon from "@/public/global/close";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const ListOfServices = ({ services, handleDelete }: IListOfServicesProps) => {
    const show = useTimeoutAnimationLoader();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    } as const;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={styles["services__list"]}
        >
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
                transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
                className={styles["services__list__header"]}
            >
                <h2>Сервисы</h2>
                <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {services.length}
                </motion.span>
            </motion.div>

            <motion.ul
                key={services.length}
                variants={containerVariants}
                initial="hidden"
                animate={show ? "visible" : "hidden"}
            >
                {services.map((service) => (
                    <motion.li
                        key={service._id}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.02,
                            x: 5,
                            transition: { duration: 0.15 },
                        }}
                        className={styles["services__list__item"]}
                    >
                        <div className={styles["services__list__item__content"]}>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <a href={service.url} target="_blank" rel="noopener noreferrer">
                                {service.url}
                            </a>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.15, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={styles["services__list__item__delete"]}
                            onClick={() => handleDelete(service._id)}
                        >
                            <CloseIcon />
                        </motion.button>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};

export default ListOfServices;