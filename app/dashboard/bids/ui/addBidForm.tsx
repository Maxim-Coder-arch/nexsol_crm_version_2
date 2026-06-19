import { useState } from "react";
import { AddBidFormProps } from "@/types/bids/bid.type";
import styles from "../index.module.scss";

const AddBidForm = ({ onAddBid }: AddBidFormProps) => {
    const [formData, setFormData] = useState({
        username: "",
        useremail: "",
        usecontact: "",
        comment: "",
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAddBid(formData);
        setFormData({ username: "", useremail: "", usecontact: "", comment: "" });
        setIsOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles["add-bid-form"]}>
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)}
                    className={styles["add-bid-btn"]}
                >
                    Добавить заявку вручную
                </button>
            ) : (
                <form onSubmit={handleSubmit} className={styles["form-container"]}>
                    <h3>Новая заявка</h3>
                    
                    <input
                        type="text"
                        name="username"
                        placeholder="Имя*"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        type="email"
                        name="useremail"
                        placeholder="Email*"
                        value={formData.useremail}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        type="url"
                        name="usecontact"
                        placeholder="Ссылка на контакт"
                        value={formData.usecontact}
                        onChange={handleChange}
                    />
                    
                    <textarea
                        name="comment"
                        placeholder="Комментарий"
                        value={formData.comment}
                        onChange={handleChange}
                        rows={3}
                    />
                    
                    <div className={styles["form-actions"]}>
                        <button type="submit" className={styles["submit-btn"]}>
                            Добавить
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setIsOpen(false)}
                            className={styles["cancel-btn"]}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default AddBidForm;