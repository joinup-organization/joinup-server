import { IProjectController } from './projects.model'

class ProjectController implements IProjectController {
    constructor(private readonly projectService: IProjectService = new ProjectService()) { }

    public readonly createProject = compose(
        functions.https.onRequest,
        createProjectValidator,
        authMiddleware,
        corsMiddleware,
    )(async (res: functions.https.Request, res: functions.Response<IResponse<null>>) => {
        try {
            const project = req.body as IProject
            await this.projectService.createProject(project)
            responseController(res, responseMessageDefault.post, showMessageMap.false)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly getProject = compose(
        functions.https.onRequest,
        getByIdValidator,
        corsMiddleware,
    )(async (res: functions.https.Request, res: functions.Response<IResponse<IProject>>) => {
        try {
            const { id } = req.query as string
            const project = await this.projectService.getProject(id)
            responseController(res, responseMessageDefault.post, showMessageMap.false, project)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly listProjects = compose(
        functions.https.onRequest,
        corsMiddleware,
    )(async (res: functions.https.Request, res: functions.Response<IResponse<IProject[]>>) => {
        try {
            const projects = await this.projectService.listProjects()
            responseController(res, responseMessageDefault.post, showMessageMap.false, projects)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly listProjectsByPO = compose(
        functions.https.onRequest,
        getByIdValidator,
        authMiddleware,
        corsMiddleware,
    )(async (res: functions.https.Request, res: functions.Response<IResponse<IProject[]>>) => {
        try {
            const { id } = req.query 
            const projects = await this.projectService.listProjectsByPO(id as string)
            responseController(res, responseMessageDefault.post, showMessageMap.false, projects)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly listProjectsByUser = compose(
        functions.https.onRequest,
        getByIdValidator,
        authMiddleware,
        corsMiddleware,
    )(async (res: functions.https.Request, res: functions.Response<IResponse<IProject[]>>) => {
        try {
            const { id } = req.query 
            const projects = await this.projectService.listProjectsByUser(id as string)
            responseController(res, responseMessageDefault.post, showMessageMap.false, projects)
        } catch (error) {
            errorController(error, res)
        }
    })
}

export const { createProject, getProject, listProjects, listProjectsByPO, listProjectsByUser }: IProjectController = new ProjectController()
