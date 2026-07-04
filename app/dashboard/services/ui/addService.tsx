import { AddServiceProps } from "@/types/services/addService.type";
import styles from "../index.module.scss";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { motion } from "framer-motion";

const AddService = ({ setFormData, handleAdd, formData }: AddServiceProps) => {
    const show  =useTimeoutAnimationLoader();
    
    return (
        <motion.div 
        initial={{opacity: 0, scale: .9}}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        className={styles["services__add"]}>
            <div className={styles["services__add__form"]}>
                <h3>Новый сервис</h3>
                <input
                    type="text"
                    placeholder="Название*"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Описание"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <input
                    type="url"
                    placeholder="Ссылка*"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <div className={styles["services__add__form__actions"]}>
                    <button className={styles["submit"]} onClick={handleAdd}>
                        Добавить
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default AddService;