export interface IProjectController {
    readonly createProject: () => any
    readonly getProject: () => any
    readonly listProjects: () => any
    readonly listProjectsByPO: () => any
    readonly listProjectsByUser: () => any
}