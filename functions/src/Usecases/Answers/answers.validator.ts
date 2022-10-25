import * as functions from 'firebase-functions'
import * as yup from 'yup'

import { IFirebaseFunction, IResponse } from '../../Response/Response.model'

import { IAnswer } from './answers.model'

class AnswersValidator {
  public readonly getAnswersValidator = (fn: IFirebaseFunction) => {
    return async (req: functions.https.Request, res: functions.Response<IResponse<IAnswer[]>>) => {
      try {
        const schema = this.buildGetAnswersValidator()
        await schema.validate(req.query)
        return fn(req, res)
      } catch (error) {
        const safeError = error as yup.ValidationError

        return res.status(400).send({
          status: false,
          errors: safeError.errors || ['Um ou mais parâmetros enviados estão inconsistentes'],
          message: 'Dados enviados inconsistentes',
        })
      }
    }
  }

  private readonly buildGetAnswersValidator = () => {
    return yup.object().required().shape({
      userId: yup.string().strict().required(),
    })
  }
}

export const { getAnswersValidator } = new AnswersValidator()
