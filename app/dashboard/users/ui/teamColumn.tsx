'use client';
import { motion } from "framer-motion";
import TeamCard from './teamCard';
import styles from '../index.module.scss';
import { TeamColumnProps } from '@/types/users/teamColumn.type';
import { ROLE_LABELS } from '@/types/team/roleLabels.type';
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const TeamColumn = ({ role, users, onEdit, onDelete, onRoleChange }: TeamColumnProps) => {
    const show = useTimeoutAnimationLoader();
    const filteredUsers = users.filter(u => u.role === role);

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

    const cardVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.35, ease: "easeOut" },
        },
    } as const;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={styles["team-column"]}
        >
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
                transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
                className={styles["team-column__header"]}
            >
                <h2>{ROLE_LABELS[role]}</h2>
                <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {filteredUsers.length}
                </motion.span>
            </motion.div>

            <motion.div
                key={filteredUsers.length}
                variants={containerVariants}
                initial="hidden"
                animate={show ? "visible" : "hidden"}
                className={styles["team-column__list"]}
            >
                {filteredUsers.length === 0 ? (
                    <motion.div
                        variants={cardVariants}
                        className={styles["team-column__empty"]}
                    >
                        Нет пользователей
                    </motion.div>
                ) : (
                    filteredUsers.map(user => (
                        <motion.div
                            key={user._id}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.15 },
                            }}
                        >
                            <TeamCard
                                user={user}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onRoleChange={onRoleChange}
                            />
                        </motion.div>
                    ))
                )}
            </motion.div>
        </motion.div>
    );
};

export default TeamColumn;