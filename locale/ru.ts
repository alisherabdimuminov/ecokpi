import type { ITranslation } from ".";

export default function ru(key: keyof ITranslation) {
    const translations: ITranslation = {
        home: "Домашняя страница",
        users: "Сотрудники",
        attendance: "Посещаемость",

        add: "Добавлять",
        save: "Сохранять",

        theme: "Тема",
        light: "Яркий",
        dark: "Темная",

    }

    return translations[key];
}