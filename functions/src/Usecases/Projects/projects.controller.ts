import * as functions from 'firebase-functions'

import { compose } from '../../Compose/compose'
import { errorController } from '../../Errors/Error.controller'
import { corsMiddleware } from '../../Middlewares/Cors.middlewares'
import { responseController } from '../../Response/Response.controller'
import { IResponse, responseMessageDefault, showMessageMap } from '../../Response/Response.model'
import { getByIdValidator } from '../../Validator/id.validator'

import { IProject, IProjectController, IProjectService } from './projects.model'
import { ProjectService } from './projects.service'
import { createProjectValidator } from './projects.validator'

class ProjectController implements IProjectController {
  constructor(private readonly projectService: IProjectService = new ProjectService()) {}

  public readonly createProject = compose(
    functions.https.onRequest,
    createProjectValidator,
    // authMiddleware,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<null>>) => {
    try {
      const project = req.body
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
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IProject>>) => {
    try {
      const { id } = req.query
      const project = await this.projectService.getProject(id as string)
      responseController(res, responseMessageDefault.post, showMessageMap.false, project)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly listProjects = compose(
    functions.https.onRequest,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IProject[]>>) => {
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
    // authMiddleware,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IProject[]>>) => {
    try {
      const { id } = req.query
      const projects = await this.projectService.listProjectsByPO(id as string)
      responseController(res, responseMessageDefault.post, showMessageMap.false, projects)
    } catch (error) {
      errorController(error, res)
    }
  })
}

export const { createProject, getProject, listProjects, listProjectsByPO }: IProjectController =
  new ProjectController()
