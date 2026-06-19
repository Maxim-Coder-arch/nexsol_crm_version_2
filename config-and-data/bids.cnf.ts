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