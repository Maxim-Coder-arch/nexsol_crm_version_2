import styles from "../index.module.scss";

interface AddServiceProps {
    setFormData: React.Dispatch<React.SetStateAction<{
        title: string;
        description: string;
        url: string;
    }>>;
    handleAdd: () => void;
    formData: {
        title: string;
        description: string;
        url: string;
    };
}

const AddService = ({ setFormData, handleAdd, formData }: AddServiceProps) => {
    return (
        <div className={styles["services__add"]}>
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
        </div>
    )
}

export default AddService;