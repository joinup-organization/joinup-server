import * as functions from 'firebase-functions'

import { compose } from '../../Compose/compose'
import { errorController } from '../../Errors/Error.controller'
import { corsMiddleware } from '../../Middlewares/Cors.middlewares'
import { responseController } from '../../Response/Response.controller'
import { IResponse, responseMessageDefault, showMessageMap } from '../../Response/Response.model'
import { getByIdValidator } from '../../Validator/id.validator'
import { IProject } from '../Projects/projects.model'

import { IUser, IUserController, IUserInitialData, IUserService } from './users.model'
import { UserService } from './users.service'
import { createUserValidator } from './users.validator'

class UserController implements IUserController {
  constructor(private readonly userService: IUserService = new UserService()) {}

  public readonly createUser = compose(
    functions.https.onRequest,
    createUserValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<string>>) => {
    try {
      const userInitialData: IUserInitialData = req.body
      const id = await this.userService.createUser(userInitialData)
      responseController(res, responseMessageDefault.post, showMessageMap.true, id)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly getUser = compose(
    functions.https.onRequest,
    getByIdValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IUser>>) => {
    try {
      const { id } = req.query
      const user = await this.userService.getUser(id as string)
      responseController(res, responseMessageDefault.post, showMessageMap.false, user)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly listUser = compose(
    functions.https.onRequest,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IUser[]>>) => {
    try {
      const users = await this.userService.listUser()
      responseController(res, responseMessageDefault.post, showMessageMap.false, users)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly updateUserToEnroll = compose(
    functions.https.onRequest,
    createUserValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<null>>) => {
    try {
      const user: IUser = req.body
      await this.userService.updateUserToEnroll(user)
      responseController(res, responseMessageDefault.post, showMessageMap.true)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly getUserProjectEnroll = compose(
    functions.https.onRequest,
    getByIdValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IProject[]>>) => {
    try {
      const { id } = req.body
      const projects = await this.userService.getUserProjectEnroll(id)
      responseController(res, responseMessageDefault.get, showMessageMap.false, projects)
    } catch (error) {
      errorController(error, res)
    }
  })
}

export const { createUser, getUser, listUser, updateUserToEnroll, getUserProjectEnroll }: IUserController =
  new UserController()
