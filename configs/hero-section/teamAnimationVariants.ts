const containerVariants__team = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
        },
    },
};

const personVariants__team = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
} as const;

export { containerVariants__team, personVariants__team }