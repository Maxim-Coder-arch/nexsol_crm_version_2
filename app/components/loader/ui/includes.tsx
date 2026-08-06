import { AnimatePresence, motion } from "framer-motion";
import { IIncludesLoaderComponent } from "@/types/loaderComponent/includes.type";
import styles from "../index.module.scss";

const IncludesLoaderComponent = ({ isLoading }: IIncludesLoaderComponent) => {
    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div 
                className={styles["loader"]}>
                    <div className={styles["loader__points"]}>
                        {Array.from({length: 3}).map((_, index) => {
                            return (
                                <motion.div 
                                initial={{ y: 0 }}
                                animate={{ 
                                    y: [-10, 0, -10],
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className={styles["loader__points__point"]} key={index}>
                                    
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default IncludesLoaderComponent;