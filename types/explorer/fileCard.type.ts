export interface IFileCard {
    _id: string;
    filename: string;          // оригинальное имя файла
    size: number;              // размер в байтах
    contentType: string;       // MIME-тип
    createdAt: Date;           // дата загрузки (uploadDate из БД)
    uploadedBy: string;        // ID пользователя, кто загрузил
    uploadedByName: string;    // имя пользователя
    isShared?: boolean;        // общий файл
}