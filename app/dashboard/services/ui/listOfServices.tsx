import { motion } from "framer-motion";
import { IListOfServicesProps } from "@/types/services/listOfServices.type";
import CloseIcon from "@/public/global/close";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import UserProtected from "@/app/components/share/protected";
import { containerVariants__services as containerVariants } from "@/configs/services/animationConfigServices";
import { itemVariants__services as itemVariants } from "@/configs/services/animationConfigServices";
import styles from "../index.module.scss";

const ListOfServices = ({ services, handleDelete }: IListOfServicesProps) => {
    const show = useTimeoutAnimationLoader();

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
                        <UserProtected roles={["director", "moderator"]}>
                            <motion.button
                                whileHover={{ scale: 1.15, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className={styles["services__list__item__delete"]}
                                onClick={() => handleDelete(service._id)}
                            >
                                <CloseIcon />
                            </motion.button>
                        </UserProtected>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};

export default ListOfServices;