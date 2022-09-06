import { firestoreAdapter } from '../../Adapters/Firestore/firestore.adapter'
import { IFirestoreAdapter } from '../../Adapters/Firestore/firestore.model'
import { ECollections } from '../../Database/database.model'

import { IProject, IProjectService } from './projects.model'

export class ProjectService implements IProjectService {
  constructor(private readonly firestore: IFirestoreAdapter = firestoreAdapter) {}

  public readonly createProject = async (project: IProject) => {
    const projectId = await this.firestore.createItem(ECollections.project, project)
    const createVacancyPromise = project.vacancies.map(
      async vacancy => await this.firestore.createItem(ECollections.vacancy, { ...vacancy, projectId }),
    )
    await Promise.all(createVacancyPromise)
  }

  public readonly getProject = async (id: string) => {
    return await this.firestore.getItem<IProject>(ECollections.project, id)
  }

  public readonly listProjects = async () => {
    return await this.firestore.getItems<IProject>(ECollections.project)
  }

  public readonly listProjectsByPO = async (id: string) => {
    return await this.firestore.getItemsByParams<IProject>(ECollections.project, [
      { key: 'POId', type: '==', value: id },
    ])
  }
}
