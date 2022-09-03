import { ECollections } from "../../Database/database.model"
import { IProject } from "./projects.model"

export class ProjectService implements IProjectService {
    constructor(private readonly firestore: IFirestoreAdapter = firestoreAdapter) {}

    public readonly createProject = async (project: IProject) => {
        await this.firestore.createItem(ECollections.project, project)
    }
    public readonly getProject = async (id: string) => {
        return await this.firestore.getItem(ECollections.project, id)
    }
    public readonly listProjects = async () => {
        return await this.firestore.getItems(ECollections.project)
    }
    public readonly listProjectsByPO = async (id: string) => {
        return await this.firestore.getItemsByParams(ECollections.project, [{key: 'POId', type: '==', value: id}])
    }
    public readonly listProjectsByUser = async (userId: string) => {
        const projectsId = (await this.firestore.getItem(ECollections.user, userId)).projects
        const promiseProjects = projectsId.map(async projectId => await this.firestore.getItem(ECollections.projct, projectId))
        return await Promise.all(promiseProjects)
    }
}