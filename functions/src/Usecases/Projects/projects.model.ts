import { IGenericDatabase } from "../../Database/database.model"
import { vacancy } from "../Vacancy/vacancy.model"

export interface IProjectController {
    readonly createProject: () => any
    readonly getProject: () => any
    readonly listProjects: () => any
    readonly listProjectsByPO: () => any
    readonly listProjectsByUser: () => any
}

export interface IProjectService {
    
}

export interface IProject extends IGenericDatabase {
    readonly name: string
    readonly description: string
    readonly POId: string
    readonly enterpriseName: string
    readonly vacancies: vacancy[]
    readonly benefits?: {
        readonly transportationVoucher?: number
        readonly mealTicket?: number 
        readonly homeOfficeVoucher?: number
    }
}