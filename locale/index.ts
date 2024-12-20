import en from "./en";
import ru from "./ru";
import uz from "./uz";

export type TLanguage = 
    | "uz"
    | "en"
    | "ru";

export interface ITranslation {
    home: string
    users: string
    attendances: string
    etiquettes: string
    tasks: string

    user: string
    attendance: string
    etiquette: string
    task: string

    allBranches: string
    allDepartments: string

    selectBranch: string
    selectDepartment: string

    // actions
    add: string
    save: string
    new: string
    addNewTask: string
    close: string

    // theme
    theme: string
    light: string
    dark: string
}

export function translate(lang: TLanguage, key: keyof ITranslation) {
    switch(lang) {
        case "uz": return uz(key);
        case "en": return en(key);
        case "ru": return ru(key);
    }
}