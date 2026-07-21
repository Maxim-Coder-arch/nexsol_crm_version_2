export const formattedData = (createdAt: string) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString('ru-RU');
    const formattedTime = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return { formattedDate, formattedTime }
}