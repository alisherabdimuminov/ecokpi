import type { ITranslation } from ".";

export default function uz(key: keyof ITranslation) {
    const translations: ITranslation = {
        home: "Bosh sahifa",
        users: "Xodimlar",
        attendance: "Davomat",
        etiquette: "Odob-axloq",

        allBranches: "Barcha filiallar",
        allDepartments: "Barcha bo'limlar",

        selectBranch: "Filialni tanlang",
        selectDepartment: "Bo'limni tanlang",

        add: "Qo'shish",
        save: "Saqlash",

        theme: "Mavzu",
        light: "Yorug'",
        dark: "Qorong'u",

    }

    return translations[key];
}