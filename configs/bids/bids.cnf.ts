export enum BidsStatus {
    new = "new",
    inProgress = "inProgress",
    finished = "finished",
}

export const columnsData = [
    { type: BidsStatus.new, title: "Новые" },
    { type: BidsStatus.inProgress, title: "В работе" },
    { type: BidsStatus.finished, title: "Завершенные" },
];

export const statusOptions = [
    { value: BidsStatus.new, label: "Новая" },
    { value: BidsStatus.inProgress, label: "В работе" },
    { value: BidsStatus.finished, label: "Завершена" },
];

export const containerVariants__bidsColumn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
        },
    },
};

export const cardVariants__bidsColumn = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: "easeOut" },
    },
} as const;


export const itemVariants__conversionStats = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
} as const;