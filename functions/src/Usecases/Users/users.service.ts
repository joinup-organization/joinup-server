import { authAdapter } from '../../Adapters/Auth/auth.adapter'
import { IAuthAdapter } from '../../Adapters/Auth/auth.model'
import { firestoreAdapter } from '../../Adapters/Firestore/firestore.adapter'
import { IFirestoreAdapter } from '../../Adapters/Firestore/firestore.model'
import { ECollections } from '../../Database/database.model'

import { EUserType, IUser, IUserInitialData, IUserService } from './users.model'

export class UserService implements IUserService {
  constructor(
    private readonly firestore: IFirestoreAdapter = firestoreAdapter,
    private readonly auth: IAuthAdapter = authAdapter,
  ) {}

  public readonly createUser = async (userInitialData: IUserInitialData) => {
    const id = await this.auth.createAuth(userInitialData.email, userInitialData.password, EUserType.user)
    return await this.firestore.createItemWithId(ECollections.user, id, {
      name: userInitialData.name,
      email: userInitialData.email,
    })
  }

  public readonly getUser = async (id: string) => {
    return await this.firestore.getItem<IUser>(ECollections.user, id)
  }

  public readonly listUser = async () => {
    return await this.firestore.getItems<IUser>(ECollections.user)
  }

  public readonly updateUserToEnroll = async (user: IUser) => {
    return await this.firestore.updateItemById(ECollections.user, user.id, user)
  }
}
