import * as functions from 'firebase-functions'

import { compose } from '../../Compose/compose'
import { DefaultError } from '../../Errors/DefaultError'
import { errorController } from '../../Errors/Error.controller'
import { corsMiddleware } from '../../Middlewares/Cors.middlewares'
import { responseController } from '../../Response/Response.controller'
import { IResponse, responseMessageDefault, showMessageMap } from '../../Response/Response.model'
import { getByIdValidator } from '../../Validator/id.validator'

import { IVacancy, IVacancyController, IVacancyService } from './vacancy.model'
import { VacancyService } from './vacancy.service'
import { enrollVacancyValidator } from './vacancy.validator'

class VacancyController implements IVacancyController {
  constructor(private readonly vacancyService: IVacancyService = new VacancyService()) {}

  public readonly getVacancy = compose(
    functions.https.onRequest,
    getByIdValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IVacancy>>) => {
    try {
      const { id, projectId } = req.query
      const vacancy = await this.vacancyService.getVacancy(projectId as string, id as string)
      responseController(res, responseMessageDefault.get, showMessageMap.false, vacancy)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly getVacanciesByProject = compose(
    functions.https.onRequest,
    getByIdValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IVacancy[]>>) => {
    try {
      const { id } = req.query
      const vacancies = await this.vacancyService.getVacanciesByProject(id as string)
      responseController(res, responseMessageDefault.get, showMessageMap.false, vacancies)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly getVacanciesByUser = compose(
    functions.https.onRequest,
    getByIdValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IVacancy[]>>) => {
    try {
      const { id } = req.query
      const vacancies = await this.vacancyService.getVacanciesByUser(id as string)
      responseController(res, responseMessageDefault.get, showMessageMap.false, vacancies)
    } catch (error) {
      errorController(error, res)
    }
  })

  public readonly enrollVacancy = compose(
    functions.https.onRequest,
    corsMiddleware,
    enrollVacancyValidator,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<null>>) => {
    try {
      const { vacancyId, userId, projectId } = req.body
      await this.vacancyService.enrollVacancy(vacancyId as string, userId as string, projectId as string)
      responseController(res, responseMessageDefault.post, showMessageMap.false)
    } catch (error) {
      if ((error as DefaultError).statusCode === 400) {
        return res.status(400).send({
          message: 'Você já se candidatou para essa vaga!',
          status: false,
        })
      }
      errorController(error, res)
    }
  })

  public readonly listVacancies = compose(
    functions.https.onRequest,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IVacancy[]>>) => {
    try {
      const vacancies = await this.vacancyService.listVacancies()
      responseController(res, responseMessageDefault.get, showMessageMap.false, vacancies)
    } catch (error) {
      errorController(error, res)
    }
  })
}

export const {
  enrollVacancy,
  getVacanciesByProject,
  getVacanciesByUser,
  getVacancy,
  listVacancies,
}: IVacancyController = new VacancyController()
