const workStatuses = [
    { value: "new", label: "Новый" },
    { value: "inProgress", label: "В работе" },
    { value: "completed", label: "Завершен" },
] as const;

const physicalStatuses = [
    { value: "successful", label: "Успешный" },
    { value: "lost", label: "Потерянный" },
] as const;

export { workStatuses, physicalStatuses };