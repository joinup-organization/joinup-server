import { firestoreAdapter } from '../../Adapters/Firestore/firestore.adapter'
import { IFirestoreAdapter } from '../../Adapters/Firestore/firestore.model'
import { ECollections } from '../../Database/database.model'

import { IVacancy, IVacancyService } from './vacancy.model'

export class VacancyService implements IVacancyService {
  constructor(private readonly firestore: IFirestoreAdapter = firestoreAdapter) {}

  public readonly getVacancy = async (id: string) => {
    return await this.firestore.getItem<IVacancy>(ECollections.vacancy, id)
  }

  public readonly getVacanciesByProject = async (projectId: string) => {
    return await this.firestore.getItemsByParams<IVacancy>(ECollections.vacancy, [
      { key: 'projectId', type: '==', value: projectId },
    ])
  }

  public readonly getVacanciesByUser = async (userId: string) => {
    return await this.firestore.getItemsByInnerCollection<IVacancy>(
      ECollections.user,
      userId,
      ECollections.vacancy,
    )
  }

  public readonly enrollVacancy = async (vacancyId: string, userId: string) => {
    const vacancy = await this.getVacancy(vacancyId)
    await this.firestore.createItemInInnerCollectionWithId(
      ECollections.user,
      userId,
      ECollections.vacancy,
      vacancy,
    )
  }

  public readonly listVacancies = async () => {
    return await this.firestore.getItems<IVacancy>(ECollections.vacancy)
  }
}
