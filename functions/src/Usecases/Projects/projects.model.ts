import { IGenericDatabase } from '../../Database/database.model'
import { IProjectVacancy } from '../Vacancy/vacancy.model'

export interface IProjectController {
  readonly createProject: () => any
  readonly getProject: () => any
  readonly listProjects: () => any
  readonly listProjectsByPO: () => any
}

export interface IProjectService {
  readonly createProject: (project: IProject) => Promise<void>
  readonly getProject: (id: string) => Promise<IProject>
  readonly listProjects: () => Promise<IProject[]>
  readonly listProjectsByPO: (id: string) => Promise<IProject[]>
}

export interface IProject extends IGenericDatabase {
  readonly name: string
  readonly description: string
  readonly POId: string
  readonly enterprise: {
    readonly name: string
    readonly id: string
  }
  readonly vacancies: IProjectVacancy[]
  readonly benefits?: {
    readonly transportationVoucher?: number
    readonly mealTicket?: number
    readonly homeOfficeVoucher?: number
  }
}
