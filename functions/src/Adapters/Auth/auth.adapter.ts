import * as admin from 'firebase-admin'

import { EUserType } from '../../Usecases/Users/users.model'

import { IAuthAdapter } from './auth.model'

class AuthAdapter implements IAuthAdapter {
  constructor(private readonly auth: admin.auth.Auth = admin.auth()) {}

  public createAuth = async (email: string, password: string, type: EUserType): Promise<string> => {
    const { uid } = await this.auth.createUser({
      email,
      password,
    })

    await this.auth.setCustomUserClaims(uid, { type })

    return uid
  }
}

export const authAdapter = new AuthAdapter()
