import { IGenericDatabase } from '../../Database/database.model'
import { IProject } from '../Projects/projects.model'

export interface IUser extends IGenericDatabase {
  readonly name: string
  readonly email: string
  readonly cpf: string
  readonly birthDate: string
  readonly gender: TGender
  readonly address: {
    readonly postalCode: string
    readonly street: string
    readonly city: string
    readonly state: string
    readonly country: string
  }
  readonly experience: IUserExperience[]
  readonly languages: IUserLanguage[]
  readonly resume: string
  readonly competencies: string[]
  readonly projects?: IProject[]
}

export interface IUserInitialData {
  readonly name: string
  readonly email: string
  readonly password: string
}

export interface IUserService {
  readonly createUser: (userInitialData: IUserInitialData) => Promise<string>
  readonly getUser: (id: string) => Promise<IUser>
  readonly updateUserToEnroll: (user: IUser) => Promise<void>
  readonly listUser: () => Promise<IUser[]>
}

export interface IUserController {
  readonly createUser: () => any
  readonly getUser: () => any
  readonly updateUserToEnroll: () => any
  readonly listUser: () => any
}

export type TGender = 'M' | 'F'

export interface IUserExperience {
  readonly enterprise: string
  readonly description: string
  readonly startedAt: string
  readonly finishedAt: string
  readonly role: string
}

export interface IUserLanguage {
  readonly name: string
  readonly level: TLanguageLevel
}

export type TLanguageLevel = 'beginner' | 'intermediary' | 'advanced' | 'fluent' | 'native'

export type TUserType = keyof typeof EUserType

export enum EUserType {
  user = 'user',
  projectOwner = 'projectOwner',
}
