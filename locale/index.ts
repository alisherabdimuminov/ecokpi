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
    attendance: string

    // actions
    add: string
    save: string

    // theme
    theme: string
    light: string
    dark: string

    // branches
    headBranch?: string
    karakalpakstanBranch?: string
    andijanBranch?: string
    bukharaBrach?: string
    ferganaBranch?: string
    jizzakhBrach?: string
    kashkadaryaBranch?: string
    navoiBranch?: string
    namanganBranch?: string
    samarkandBranch?: string
    surkhandaryoBranch?: string
    syrdaryoBranch?: string
    tashkentBranch?: string
    khwarazmBranch?: string
    tashkentCityBranch?: string

    // department
    leadership?: string
    internalControlService?: string
    legalService?: string
    accountingDepartment?: string
    firstDepartment?: string
    humanResourceManagement?: string
    issuesOfEnsuringRespectForTheStateLanguage?: string
    economicAffairsDepartment?: string
    methodology?: string
    departmentOfInternationalConventions?: string
    departmentOfExecutiveDiscipline?: string
    informationAndCommunicationTechnologyDevelopmentDepartment?: string
    communityRelationsDepartment?: string
    stateDepartmentOfEnvironmentalExpertise?: string
    departmentForReceivingApplicationsForStateEnvironmentalExpertise?: string
    departmentOfRealizationOfObjectsOfEcologicalExpertise?: string
    informationAndAnalysisDepartment?: string
    monitoringDepartment?: string
    technicalAndServicePersonnel?: string

    // positions
    ceo?: string
    firstDeputyGeneralDirector?: string
    deputyGeneralDirector?: string
    advisorToTheCEO?: string
    chiefLegalOfficer?: string
    departmentHead?: string
    expert?: string
    chiefSpecialist?: string
    leadingSpecialist?: string
    chiefExpert?: string
    leadingExpert?: string
    technician?: string
    branchManager?: string
    accountantLeadingSpecialist?: string


}

export function translate(lang: TLanguage, key: keyof ITranslation) {
    switch(lang) {
        case "uz": return uz(key);
        case "en": return en(key);
        case "ru": return ru(key);
    }
}