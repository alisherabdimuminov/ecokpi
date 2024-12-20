import type { ITranslation } from ".";

export default function en(key: keyof ITranslation) {
    const translations: ITranslation = {
        home: "Home",
        users: "Employees",
        attendances: "Attendance",
        etiquettes: "Etiquette",
        tasks: "Tasks",

        user: "User",
        attendance: "Attendance",
        etiquette: "Etiquette",
        task: "Task",

        allBranches: "All branches",
        allDepartments: "All department",

        selectBranch: "Select branch",
        selectDepartment: "Select department",
        
        add: "Add",
        save: "Save",
        new: "New",
        addNewTask: "Add a new task",
        close: "Close",

        theme: "Theme",
        light: "Light",
        dark: "Dark",
    }

    return translations[key];
}