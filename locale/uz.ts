import type { ITranslation } from ".";

export default function uz(key: keyof ITranslation) {
    const translations: ITranslation = {
        home: "Bosh sahifa",
        users: "Xodimlar",
        attendance: "Davomat",

        add: "Qo'shish",
        save: "Saqlash",

        theme: "Mavzu",
        light: "Yorug'",
        dark: "Qorong'u",

        headBranch: "Davlat ekologik ekspertiza markazi",
        karakalpakstanBranch: "Qoraqalpog'iston respublikasi filiali",
        andijanBranch: "Andijon viloyati filiali",
        bukharaBrach: "Buxoro viloyati filiali",
    }

    return translations[key];
}