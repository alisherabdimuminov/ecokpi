export interface IUser {
    uuid: string
    pid: string
    username: string
    full_name: string
    image: string
    passport_number: string
    passport_pinfl: string
    branch: string
    department: string
    position: string
    role: "admin" | "analyst" | "cadre" | "user" | "userx"
    token: string
}

export interface IAttendance {
    uuid: string
    username: string
    full_name: string
    branch: string
    department: string
    position: string
    is_arrived: boolean
}

export interface IAttendances {
    [date: string]: IAttendance[]
}

export interface IEtiquette {
    uuid: string
    username: string
    full_name: string
    branch: string
    department: string
    position: string
    point: string
}

export interface IEtiquettes {
    [month: string]: IEtiquette[]
}

export interface ITask {
    uuid: string
    position: string
    name: string
    point: number
    term: "regular" | "monthly" | "quarter" | "annual"
}

export interface ISubmit {
    uuid: string
    user: IUser
    task: ITask
    file: string
    status: "approved" | "rejected" | "in_process" | "created"
    created: string
}

export interface IResponse<T=string> {
    status: "success" | "error"
    code: string
    data: T
}

export const branches = [
    "Davlat ekologik ekspertiza markazi",
    "Qoraqalpog'iston respublikasi filiali",
    "Andijon viloyati filiali",
    "Buxoro viloyati filiali",
    "Farg'ona viloyati filiali",
    "Jizzax viloyati filiali",
    "Qashqadaryo viloyati filiali",
    "Navoi viloyati filiali",
    "Namangan viloyati filiali",
    "Samarqand viloyati filiali",
    "Surxondaryo viloyati filiali",
    "Sirdaryo viloyati filiali",
    "Toshkent viloyati filiali",
    "Toshkent shahri filiali",
    "Xorazm viloyati filiali",
]

export const departments = [
    "Raxbariyat",
    "Ichki nazorat xizmati",
    "Yuridik xizmati",
    "Buxgalteriya bo'limi",
    "Birinchi bo'lim",
    "Inson resurslarini boshqarish",
    "Davlat tiliga rioya etilishini ta'minlash masalari",
    "Xo'jalik ishlari bo'limi",
    "Metodologiya bo'limi",
    "Xalqaro konvensiyalar bilan ishlash bo'limi",
    "Ijro intizomi bo'limi",
    "Axborot kommunikatsiya texnologiyalarini rivojlantirish",
    "Jamoatchilik bilan ishlash bo'limi",
    "Davlat ekologik ekpertizasini o'tkazish boshqarmasi",
    "Davlat ekologik ekspertizasiga arizalarni qabul qilish bo'limi",
    "Ekologik ekspertiza obyektlarini to'yobga chiqarish bo'limi",
    "Axborot tahlil bo'limi",
    "Monitoring bo'limi",
    "Texnik va xizmat ko'rsatish xodimlari",
]

export const positions = [
    "Bosh direktor",
    "Bosh direktorning birinchi o'rinbosari",
    "Bosh direktor o'ribosari",
    "Bosh direktor maslahatchisi",
    "Bosh yuriskonsult",
    "Bo'lim boshlig'i",
    "Bosh mutaxasis",
    "Yetakchi mutaxasis",
    "Texnik xodim",
    "Filial direktori",
    "Hisobchi yetakchi mutaxasis",
    "Ekspert",
]

export const roles = [
    "admin", "analyst", "cadre", "user", "userx",
]

export const months = {
    "January": 1, 
    "February": 2, 
    "March": 3, 
    "April": 4, 
    "May": 5, 
    "June": 6, 
    "July": 7, 
    "August": 8, 
    "September": 9, 
    "October": 10, 
    "November": 11, 
    "December": 12 
};
