import type { ITranslation } from ".";

export default function en(key: keyof ITranslation) {
    const translations: ITranslation = {
        home: "Home",
        users: "Employees",
        attendance: "Attendance",
        etiquette: "Etiquette",
        
        allBranches: "All branches",
        allDepartments: "All department",

        selectBranch: "Select branch",
        selectDepartment: "Select department",
        
        add: "Add",
        save: "Save",

        theme: "Theme",
        light: "Light",
        dark: "Dark",
    }

    return translations[key];
}