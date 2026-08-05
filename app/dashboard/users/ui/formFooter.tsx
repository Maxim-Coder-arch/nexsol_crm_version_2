import { IFormFooter } from "@/types/users/formFooter.type";
import styles from "../index.module.scss";

const FormFooter = ({ onCancel }: IFormFooter) => {
    return (
        <div className={styles["add-user-form__footer"]}>
            <button type="submit" className={styles["add-user-form__submit"]}>
                Добавить
            </button>
            <button type="button" className={styles["add-user-form__cancel"]} onClick={onCancel}>
                Отмена
            </button>
        </div>
    )
}

export default FormFooter;