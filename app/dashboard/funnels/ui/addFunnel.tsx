import { motion } from "framer-motion";
import { FunnelType } from "@/types/funnels/ItemType.type";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import UserProtected from "@/app/components/share/protected";
import { IAddFunnel } from "@/types/funnels/addFunnel.type";
import styles from "../index.module.scss";

const AddFunnel = ({ 
    funnelTypes, 
    title, 
    setTitle, 
    type, 
    setType, 
    handleSubmit
 }: IAddFunnel) => {
    const show = useTimeoutAnimationLoader();
    
    return (
        <UserProtected>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={styles["add-funnel"]}
            >
                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.95 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    onSubmit={handleSubmit}
                    className={styles["add-funnel__form"]}
                >
                    <motion.input
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        type="text"
                        placeholder="Название воронки"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <motion.select
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        value={type}
                        onChange={(e) => setType(e.target.value as FunnelType)}
                    >
                        {funnelTypes.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </motion.select>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
                        type="submit"
                    >
                        Добавить
                    </motion.button>
                </motion.form>
            </motion.div>
        </UserProtected>
    );
};

export default AddFunnel;