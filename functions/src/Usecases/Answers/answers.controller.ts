import * as functions from 'firebase-functions'

import { compose } from '../../Compose/compose'
import { errorController } from '../../Errors/Error.controller'
import { corsMiddleware } from '../../Middlewares/Cors.middlewares'
import { responseController } from '../../Response/Response.controller'
import { IResponse, responseMessageDefault, showMessageMap } from '../../Response/Response.model'

import { IAnswer, IAnswerService } from './answers.model'
import { AnswersService } from './answers.service'
import { getAnswersValidator } from './answers.validator'

class AnswersController {
  constructor(private readonly answersService: IAnswerService = new AnswersService()) {}

  public readonly getAnswers = compose(
    functions.https.onRequest,
    getAnswersValidator,
    corsMiddleware,
  )(async (req: functions.https.Request, res: functions.Response<IResponse<IAnswer[]>>) => {
    try {
      const { userId } = req.query

      const answers = await this.answersService.getAnswers(userId as string)
      responseController(res, responseMessageDefault.get, showMessageMap.false, answers)
    } catch (error) {
      errorController(error, res)
    }
  })
}

export const { getAnswers } = new AnswersController()
