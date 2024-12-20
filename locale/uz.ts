import type { ITranslation } from ".";

export default function uz(key: keyof ITranslation) {
    const translations: ITranslation = {
        home: "Bosh sahifa",
        users: "Xodimlar",
        attendances: "Davomat",
        etiquettes: "Odob-axloq",
        tasks: "Vazifalar",

        user: "Xodim",
        attendance: "Davomat",
        etiquette: "Odob-axloq",
        task: "Vazifa",

        allBranches: "Barcha filiallar",
        allDepartments: "Barcha bo'limlar",

        selectBranch: "Filialni tanlang",
        selectDepartment: "Bo'limni tanlang",

        add: "Qo'shish",
        save: "Saqlash",
        new: "Yangi",
        addNewTask: "Yangi vazifa qo'shish",
        close: "Yopish",

        theme: "Mavzu",
        light: "Yorug'",
        dark: "Qorong'u",

    }

    return translations[key];
}