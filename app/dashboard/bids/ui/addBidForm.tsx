import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../index.module.scss";
import { AddBidFormProps } from "@/types/bids/addBidForm.type";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import UserProtected from "@/app/components/share/protected";

const AddBidForm = ({ onAddBid }: AddBidFormProps) => {
  const show = useTimeoutAnimationLoader();
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
    <UserProtected roles={["director", "moderator"]}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles["add-bid-form"]}
      >
        {!isOpen ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className={styles["add-bid-btn"]}
          >
            Добавить заявку вручную
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.form
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className={styles["form-container"]}
            >
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                Новая заявка
              </motion.h3>

              <motion.input
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.07 }}
                type="text"
                name="username"
                placeholder="Имя*"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <motion.input
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                type="email"
                name="useremail"
                placeholder="Email*"
                value={formData.useremail}
                onChange={handleChange}
                required
              />

              <motion.input
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.13 }}
                type="url"
                name="usecontact"
                placeholder="Ссылка на контакт"
                value={formData.usecontact}
                onChange={handleChange}
              />

              <motion.textarea
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.16 }}
                name="comment"
                placeholder="Комментарий"
                value={formData.comment}
                onChange={handleChange}
                rows={3}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={styles["form-actions"]}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className={styles["submit-btn"]}
                >
                  Добавить
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles["cancel-btn"]}
                >
                  Отмена
                </motion.button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        )}
      </motion.div>
    </UserProtected>
  );
};

export default AddBidForm;