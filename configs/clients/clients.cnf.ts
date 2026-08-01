const workStatuses = [
    { value: "new", label: "Новый" },
    { value: "inProgress", label: "В работе" },
    { value: "completed", label: "Завершен" },
] as const;

const physicalStatuses = [
    { value: "successful", label: "Успешный" },
    { value: "lost", label: "Потерянный" },
] as const;


const containerVariants__client = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const cardVariants__client = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: "easeOut" },
    },
} as const;

export { workStatuses, physicalStatuses, containerVariants__client, cardVariants__client };