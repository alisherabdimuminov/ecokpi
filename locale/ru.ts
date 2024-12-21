import type { ITranslation } from ".";

export default function ru(key: keyof ITranslation) {
    const translations: ITranslation = {
        home: "Домашняя страница",
        users: "Сотрудники",
        attendances: "Посещаемость",
        etiquettes: "Этикет",
        tasks: "Задачи",

        user: "Пользователь",
        attendance: "Посещаемость",
        etiquette: "Этикет",
        task: "Задача",

        allBranches: "Все филиалы",
        allDepartments: "Все разделы",

        selectBranch: "Выберите филиал",
        selectDepartment: "Выберите раздел",

        add: "Добавлять",
        save: "Сохранять",
        new: "Новый",
        addNewTask: "Добавить новую задачу",
        close: "Закрытие",
        delete: "Удалить",

        theme: "Тема",
        light: "Яркий",
        dark: "Темная",

    }

    return translations[key];
}