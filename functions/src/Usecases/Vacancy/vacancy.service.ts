/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { firestoreAdapter } from '../../Adapters/Firestore/firestore.adapter'
import { IFirestoreAdapter } from '../../Adapters/Firestore/firestore.model'
import { ECollections } from '../../Database/database.model'
import { IProject } from '../Projects/projects.model'
import { IUser } from '../Users/users.model'

import { IVacancy, IVacancyService } from './vacancy.model'

export class VacancyService implements IVacancyService {
  constructor(private readonly firestore: IFirestoreAdapter = firestoreAdapter) {}

  public readonly getVacancy = async (projectId: string, id: string) => {
    const project = await this.firestore.getItem<IProject>(ECollections.project, projectId)
    return { ...project.vacancies.find(vacancy => vacancy.id === id)!, projectId }
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

  public readonly enrollVacancy = async (vacancyId: string, userId: string, projectId: string) => {
    const vacancy = await this.getVacancy(projectId, vacancyId)
    await this.firestore.createItemInInnerCollectionWithId(
      ECollections.user,
      userId,
      ECollections.vacancy,
      vacancy,
    )
    const user = await this.firestore.getItem<IUser>(ECollections.user, userId)
    const project = await this.firestore.getItem<IProject>(ECollections.project, projectId)
    const projects = user.projects ?? []
    projects.push({
      enterprise: project.enterprise,
      id: projectId,
      name: project.name,
    } as IProject)
    await this.firestore.updateItemById(ECollections.user, userId, { projects })
  }

  public readonly listVacancies = async () => {
    return await this.firestore.getItems<IVacancy>(ECollections.vacancy)
  }
}
