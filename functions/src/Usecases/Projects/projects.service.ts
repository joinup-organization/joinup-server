export class ProjectService implements IProjectService {
    constructor(private readonly firestore: IFirestoreAdapter = firestoreAdapter) {}

    public readonly createProject = (projct: IProject) => {
        await this.firestore.createItem(ECollection.projects, project)
    }
    public readonly getProject = (id: string) => {
        return await this.firestore.getItem(ECollection.projects, id)
    }
    public readonly listProjects = () => {
        return await this.firestore.getItems(ECollection.projects)
    }
    public readonly listProjectsByPO = (id: string) => {
        return await this.firestore.getItemsByParams(ECollection.projects, [{key: 'POId', type: '==', value: id}])
    }
    public readonly listProjectsByUser = (userId: string) => {
        const projectsId = (await this.firestore.getItem(ECollection.users, userId)).projects
        const promiseProjects = projectsId.map(async projectId => await this.firestore.getItem(ECollection.projct, projectId))
        return await Promise.all(promiseProjects)
    }
}