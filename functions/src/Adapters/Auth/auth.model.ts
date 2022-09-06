import { EUserType } from '../../Usecases/Users/users.model'

export interface IAuthAdapter {
  readonly createAuth: (email: string, password: string, type: EUserType) => Promise<string>
}
