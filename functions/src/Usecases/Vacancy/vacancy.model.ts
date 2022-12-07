export interface IVacancyService {
  readonly getVacancy: (projectId: string, id: string) => Promise<IVacancy>
  readonly getVacanciesByProject: (projectId: string) => Promise<IVacancy[]>
  readonly getVacanciesByUser: (userId: string) => Promise<IVacancy[]>
  readonly enrollVacancy: (vacancyId: string, userId: string, projectId: string) => Promise<void>
  readonly listVacancies: () => Promise<IVacancy[]>
}

export interface IVacancyController {
  readonly getVacancy: () => any
  readonly getVacanciesByProject: () => any
  readonly getVacanciesByUser: () => any
  readonly enrollVacancy: () => any
  readonly listVacancies: () => any
}

export interface IProjectVacancy {
  readonly id: string
  readonly name: string
  readonly level: TVacancyLevel
  readonly description: string
  readonly experienceYears: number
  readonly higherEducation: boolean
  readonly salaryRange: {
    readonly min: number
    readonly max: number
  }
}

export interface IVacancy extends IProjectVacancy {
  readonly projectId: string
}

export type TVacancyLevel = 'intern' | 'trainee' | 'junior' | 'middle' | 'senior' | 'specialist'
